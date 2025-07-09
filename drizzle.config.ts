// drizzle.config.ts (versión CORREGIDA)

import 'dotenv/config'; // <-- ¡LA LÍNEA CLAVE QUE ARREGLA TODO!
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Esta línea ahora sí encontrará la variable gracias a dotenv
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});