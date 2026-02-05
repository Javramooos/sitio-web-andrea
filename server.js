require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const { eq } = require('drizzle-orm');
const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

// Importa los esquemas de la base de datos
const schema = require('./src/db/schema');

const app = express();
const port = process.env.PORT || 3001;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE LA BASE DE DATOS (Drizzle + Neon) ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const db = drizzle(pool, { schema });
console.log('Conexión a la base de datos preparada.');

// --- CONFIGURACIÓN DE CLIENTES API ---
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('Cliente de SendGrid configurado.');


// --- ENDPOINTS DE LA API ---

/**
 * @route POST /api/subscribe
 * @description Gestiona la suscripción de un nuevo usuario y le envía la guía por correo.
 * @access Public
 */
app.post('/api/subscribe', async (req, res) => {
  const { name, email } = req.body;

  // 1. Validar que ambos campos no estén vacíos
  if (!name || !email) {
    return res.status(400).json({ error: 'Los campos name y email son obligatorios.' });
  }

  try {
    // 2. Verificar si el email ya existe en la tabla 'subscribers'
    const existingUser = await db.select()
      .from(schema.subscribers)
      .where(eq(schema.subscribers.email, email));

    if (existingUser.length > 0) {
      // 3. Si el email ya existe, responder con un estado 409 (Conflict)
      return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // 4. Si el usuario es nuevo, insertarlo en la tabla
    const newUser = await db.insert(schema.subscribers).values({
      name,
      email,
    }).returning();
    
    console.log(`Nuevo usuario registrado: ${email}`);

    // 5. Enviar correo de bienvenida con la guía adjunta
    const guidePath = path.join(__dirname, 'public', 'assets', 'guia_piel_radiante.pdf');
    const guideAttachment = fs.readFileSync(guidePath).toString('base64');

    const msg = {
      to: email,
      from: 'andrea.diaz.red@gmail.com', // Reemplazar con tu email verificado en SendGrid
      subject: '¡Gracias por suscribirte! Aquí está tu guía gratuita',
      text: `Hola ${name},

Gracias por tu interés. Adjunto encontrarás tu guía gratuita para una piel radiante.

Saludos cordiales,
El equipo de la Dra. Andrea Díaz`,
      attachments: [{
        content: guideAttachment,
        filename: 'guia_piel_radiante.pdf',
        type: 'application/pdf',
        disposition: 'attachment',
      }],
    };

    await sgMail.send(msg);
    console.log(`Correo con la guía enviado exitosamente a ${email}`);

    // 6. Responder con un estado 201 (Created) y los datos del usuario registrado
    res.status(201).json(newUser[0]);

  } catch (error) {
    // 7. Manejar cualquier error inesperado del servidor
    console.error('Error en el proceso de suscripción:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// --- INICIO DEL SERVIDOR ---
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
