require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// Importa el esquema de la base de datos
const schema = require('./src/db/schema');

const app = express();
const port = process.env.PORT || 3001;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE SETUP (Drizzle + Neon) ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const db = drizzle(pool, { schema });
console.log('Database connection prepared.');

// --- API CLIENTS SETUP ---
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('SendGrid client configured.');

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
console.log('Twilio client configured.');


// --- API ENDPOINTS ---

// Endpoint para suscribir un nuevo prospecto
app.post('/api/subscribe', async (req, res) => {
  const { name, email, phone, communicationPreference } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    // 1. Guardar el prospecto en la base de datos
    const newProspect = await db.insert(schema.prospects).values({
      name,
      email,
      phone,
      communicationPreference,
    }).returning();

    const prospectId = newProspect[0].id;
    console.log(`New prospect saved with ID: ${prospectId}`);

    // Adjuntar y enviar email de bienvenida
    const guidePath = path.join(__dirname, 'public', 'assets', 'guia_piel_radiante.pdf');
    const guideAttachment = fs.readFileSync(guidePath).toString('base64');

    const msg = {
      to: email,
      from: 'andrea.diaz.red@gmail.com',
      subject: '¡Gracias por tu interés! Aquí está tu guía gratuita',
      text: `Hola ${name},

Gracias por tu interés. Adjunto encontrarás tu guía gratuita para una piel radiante.

Saludos,
El equipo de la Dra. Andrea Díaz`,
      attachments: [{
        content: guideAttachment,
        filename: 'guia_piel_radiante.pdf',
        type: 'application/pdf',
        disposition: 'attachment',
      }],
    };

    await sgMail.send(msg);
    console.log(`Welcome email with guide sent to ${email}`);

    // 3. Registrar el email en los logs
    await db.insert(schema.messageLogs).values({
      prospectId: prospectId,
      type: 'email',
      status: 'sent',
    });
    console.log('Email log saved.');

    res.status(200).json({ message: 'Subscription successful!', prospect: newProspect[0] });

  } catch (error) {
    // Manejo de error de email duplicado
    if (error.code === '23505') { // Código de error de PostgreSQL para violación de unicidad
      console.error('Subscription attempt with duplicate email:', email);
      return res.status(400).json({ error: 'This email address is already subscribed.' });
    }
    console.error('Error during subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- CONTENT FOR FOLLOW-UP SEQUENCES ---
const followUpEmails = [
  { subject: '3 Mitos sobre el Envejecimiento de la Piel', text: 'Hola {name}, ...' },
  { subject: 'El Secreto para una Piel Radiante', text: 'Hola {name}, ...' },
];

const followUpWhatsapps = [
    {
        body: 'Hola {name}, soy del equipo de la Dra. Andrea Díaz. ¿Te gustaría agendar una cita de valoración sin costo?'
    },
    {
        body: 'Hola {name}, te recordamos que tienes disponible una cita de valoración con la Dra. Andrea Díaz.'
    }
];


// --- CRON JOBS (TAREAS PROGRAMADAS) ---
cron.schedule('0 10 * * *', async () => {
  console.log('Running daily follow-up tasks...');
  
  const { and, eq, sql } = require('drizzle-orm');

  try {
    const prospects = await db.query.prospects.findMany();

    for (const prospect of prospects) {
      const today = new Date();
      const registrationDate = new Date(prospect.createdAt);
      const timeDiff = today.getTime() - registrationDate.getTime();
      const daysSinceRegistration = Math.floor(timeDiff / (1000 * 3600 * 24));

      if (daysSinceRegistration <= 0) continue;

      if (prospect.communicationPreference === 'email' && daysSinceRegistration % 3 === 0) {
        const emailCountResult = await db.select({ count: sql`count(*)` }).from(schema.messageLogs).where(and(eq(schema.messageLogs.prospectId, prospect.id), eq(schema.messageLogs.type, 'email')));
        const emailsSent = parseInt(emailCountResult[0].count) - 1;

        if (emailsSent < followUpEmails.length) {
          const emailToSend = followUpEmails[emailsSent];
          console.log(`Sending email to ${prospect.email}...`);
          await sgMail.send({ to: prospect.email, from: 'andrea.diaz.red@gmail.com', subject: emailToSend.subject, text: emailToSend.text.replace('{name}', prospect.name) });
          await db.insert(schema.messageLogs).values({ prospectId: prospect.id, type: 'email', status: 'sent' });
        }
      }

      if (prospect.communicationPreference === 'whatsapp' && daysSinceRegistration % 5 === 0 && prospect.phone) {
        const whatsappCountResult = await db.select({ count: sql`count(*)` }).from(schema.messageLogs).where(and(eq(schema.messageLogs.prospectId, prospect.id), eq(schema.messageLogs.type, 'whatsapp')));
        const whatsappSent = parseInt(whatsappCountResult[0].count);

        if (whatsappSent < followUpWhatsapps.length) {
          const whatsappToSend = followUpWhatsapps[whatsappSent];
          console.log(`Sending WhatsApp to ${prospect.phone}...`);
          await twilioClient.messages.create({ from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`, to: `whatsapp:${prospect.phone}`, body: whatsappToSend.body.replace('{name}', prospect.name) });
          await db.insert(schema.messageLogs).values({ prospectId: prospect.id, type: 'whatsapp', status: 'sent' });
        }
      }
    }
  } catch (error) {
    console.error('Error running cron job:', error);
  }
}, { scheduled: true, timezone: "America/Bogota" });

console.log('Cron jobs for follow-ups scheduled.');


// --- SERVER START ---
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
