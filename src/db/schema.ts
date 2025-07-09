// Pega esto en tu archivo: src/db/schema.ts

import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

// Este es un ejemplo, puedes modificarlo después con tus tablas reales.
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  email: varchar('email', { length: 256 }).notNull(),
});

// Puedes agregar más tablas aquí si lo necesitas
// export const products = pgTable(...)