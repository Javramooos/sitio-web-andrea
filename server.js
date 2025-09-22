require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');
const cron = require('node-cron');

// Importa el esquema de la base de datos
const schema = require('./src/db/schema');

const app = express();
const port = process.env.PORT || 3001; // Use port 3001 for backend

// --- MIDDLEWARE ---
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite al servidor entender JSON

// --- DATABASE SETUP (Drizzle + Neon) ---
// Create a new Pool instance using the DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon's SSL
  },
});
const db = drizzle(pool, { schema });
console.log('Database connection prepared.');

// --- API CLIENTS SETUP ---
// SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('SendGrid client configured.');

// Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
console.log('Twilio client configured.');


// --- API ENDPOINTS ---

// Endpoint para suscribir un nuevo prospecto
app.post('/api/subscribe', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    // 1. Guardar el prospecto en la base de datos
    const newProspect = await db.insert(schema.prospects).values({
      name,
      email,
      phone,
    }).returning();

    const prospectId = newProspect[0].id;
    console.log(`New prospect saved with ID: ${prospectId}`);

    // 2. Enviar email de bienvenida con SendGrid
    const msg = {
      to: email,
      from: 'andrea.diaz.red@gmail.com', // IMPORTANTE: Debe ser un email verificado en SendGrid
      subject: '¡Gracias por tu interés! Aquí está tu guía gratuita',
      text: `Hola ${name},

Gracias por tu interés en los servicios de la Dra. Andrea Díaz.

Aquí puedes descargar tu guía gratuita sobre [TEMA DE LA GUÍA].

Pronto recibirás más consejos útiles.

Saludos,
El equipo de la Dra. Andrea Díaz`,
      // html: '<strong>También puedes usar HTML</strong>',
    };

    await sgMail.send(msg);
    console.log(`Welcome email sent to ${email}`);

    // 3. Registrar el email en los logs
    await db.insert(schema.messageLogs).values({
      prospectId: prospectId,
      type: 'email',
      status: 'sent',
    });
    console.log('Email log saved.');

    // (Opcional) Enviar un WhatsApp de bienvenida con Twilio
    // ... Lógica de Twilio aquí ...

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


// --- CONTENT FOR FOLLOW-UP SEQUENCE ---
const followUpEmails = [
  { // Day 1
    subject: '3 Mitos sobre el Envejecimiento de la Piel',
    text: 'Hola {name},\n\n¿Sabías que muchos enfoques comunes para el cuidado de la piel en realidad no funcionan? Hoy desmentimos 3 mitos para ayudarte a cuidar mejor tu belleza.\n\n[Contenido del consejo 1]\n\nSi quieres una valoración profesional, estamos aquí para ayudarte. ¡Agenda tu cita!\n\nSaludos,\nEl equipo de la Dra. Andrea Díaz',
  },
  { // Day 2
    subject: 'El Secreto para una Piel Radiante: Más Allá de las Cremas',
    text: 'Hola {name},\n\nLas cremas son importantes, pero el verdadero secreto de una piel radiante viene de adentro y de tratamientos específicos. Hoy te contamos cómo la Dra. Andrea Díaz combina técnicas para lograr resultados espectaculares.\n\n[Contenido del consejo 2]\n\n¿Lista para ver un cambio real? Agenda tu valoración personalizada.\n\nSaludos,\nEl equipo de la Dra. Andrea Díaz',
  },
  { // Day 3
    subject: 'Caso de Éxito: La transformación de [Nombre Paciente]',
    text: 'Hola {name},\n\nNada habla mejor que los resultados. Te compartimos la historia de una de nuestras pacientes y cómo un tratamiento personalizado cambió su piel y su confianza.\n\n[Historia y fotos de antes/después]\n\nTu también puedes lograr una transformación. Hablemos sobre tus objetivos.\n\nSaludos,\nEl equipo de la Dra. Andrea Díaz',
  },
  { // Day 4
    subject: '¿Botox, Rellenos o Láser? Entiende cuál es para ti',
    text: 'Hola {name},\n\nEl mundo de la medicina estética puede ser confuso. Te explicamos de forma sencilla las diferencias entre los tratamientos más populares y para qué sirve cada uno.\n\n[Explicación breve de cada servicio]\n\nLa mejor forma de saber qué necesitas es con la guía de un experto. Agenda una consulta con la Dra. Andrea.\n\nSaludos,\nEl equipo de la Dra. Andrea Díaz',
  },
  { // Day 5
    subject: 'Tu Belleza, Tu Decisión: Da el siguiente paso',
    text: 'Hola {name},\n\nHas estado recibiendo nuestros consejos y esperamos que te hayan sido útiles. Cuidar de ti es una decisión poderosa.\n\nSi sientes que es el momento de invertir en ti y quieres la guía de una experta, la Dra. Andrea Díaz está lista para ayudarte a crear un plan personalizado.\n\nNo esperes más para sentirte y verte como siempre has querido. Haz clic aquí para agendar tu valoración. Es el primer paso hacia tu mejor versión.\n\n[Link al Botón de Agendar]\n\nSaludos,\nEl equipo de la Dra. Andrea Díaz',
  }
];


// --- CRON JOBS (TAREAS PROGRAMADAS) ---
// Tarea programada para enviar mensajes de seguimiento.
// Se ejecuta todos los días a las 10:00 AM.
cron.schedule('0 10 * * *', async () => {
  console.log('Running daily follow-up task...');
  
  const { and, gte, eq } = require('drizzle-orm');

  try {
    // 1. Obtener prospectos que se registraron en los últimos 6 días.
    const sixDaysAgo = new Date();
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    const prospects = await db.query.prospects.findMany({
      where: gte(schema.prospects.createdAt, sixDaysAgo),
    });

    console.log(`Found ${prospects.length} recent prospects to check.`);

    // 2. Iterar sobre cada prospecto para ver si necesita un correo.
    for (const prospect of prospects) {
      try {
        // Contar cuántos correos ha recibido.
        const sentMessages = await db.select().from(schema.messageLogs).where(and(
            eq(schema.messageLogs.prospectId, prospect.id),
            eq(schema.messageLogs.type, 'email')
        ));
        
        // El primer email es de bienvenida, los siguientes son de seguimiento.
        const followUpMessagesSent = sentMessages.length - 1;

        if (followUpMessagesSent >= followUpEmails.length) {
          // Ya completó la secuencia, no hacer nada.
          continue;
        }

        // Calcular cuántos días han pasado desde el registro.
        const today = new Date();
        const registrationDate = new Date(prospect.createdAt);
        const timeDiff = today.getTime() - registrationDate.getTime();
        const daysSinceRegistration = Math.floor(timeDiff / (1000 * 3600 * 24));

        // Si el número de días pasados es mayor que el número de seguimientos enviados,
        // y no hemos superado el total de la secuencia, es hora de enviar el siguiente.
        if (daysSinceRegistration > followUpMessagesSent && followUpMessagesSent < followUpEmails.length) {
          const emailToSend = followUpEmails[followUpMessagesSent];
          
          console.log(`Sending Day ${followUpMessagesSent + 1} email to ${prospect.email}...`);

          const msg = {
            to: prospect.email,
            from: 'andrea.diaz.red@gmail.com', // Email verificado en SendGrid
            subject: emailToSend.subject,
            text: emailToSend.text.replace('{name}', prospect.name),
          };

          await sgMail.send(msg);

          // Registrar el correo en la base de datos
          await db.insert(schema.messageLogs).values({
            prospectId: prospect.id,
            type: 'email',
            status: 'sent',
          });

          console.log(`Email for Day ${followUpMessagesSent + 1} sent successfully to ${prospect.email}.`);
        }
      } catch (prospectError) {
        console.error(`Failed to process prospect ID ${prospect.id}:`, prospectError);
      }
    }

  } catch (error) {
    console.error('Error running cron job:', error);
  }
}, {
  scheduled: true,
  timezone: "America/Bogota" // Ajustar a la zona horaria correcta
});

console.log('Cron job for follow-ups scheduled.');


// --- SERVER START ---
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});