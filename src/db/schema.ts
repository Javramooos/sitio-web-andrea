import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

// Tabla para almacenar los prospectos que se registran en el formulario
export const prospects = pgTable('prospects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabla para registrar cada mensaje enviado a los prospectos
export const messageLogs = pgTable('message_logs', {
    id: serial('id').primaryKey(),
    prospectId: integer('prospect_id').notNull().references(() => prospects.id),
    type: varchar('type', { length: 50 }).notNull(), // 'email' or 'whatsapp'
    status: varchar('status', { length: 50 }).notNull(), // 'sent', 'failed'
    sentAt: timestamp('sent_at').defaultNow().notNull(),
});
