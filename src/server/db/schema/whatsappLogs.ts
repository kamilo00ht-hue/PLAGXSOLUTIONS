import { mysqlTable, varchar, text, datetime, mysqlEnum, index } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const whatsappLogs = mysqlTable(
  'whatsapp_logs',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    tecnicoId: varchar('tecnico_id', { length: 36 }).notNull(),
    citaId: varchar('cita_id', { length: 36 }).notNull(),
    telefonoDestino: varchar('telefono_destino', { length: 25 }).notNull(),
    mensaje: text('mensaje').notNull(),
    estado: mysqlEnum('estado', ['SENT', 'FAILED']).notNull().default('SENT'),
    providerMessageId: varchar('provider_message_id', { length: 100 }),
    providerError: text('provider_error'),
    createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => ({
    tecnicoIdx: index('idx_whatsapp_logs_tecnico_id').on(table.tecnicoId),
    citaIdx: index('idx_whatsapp_logs_cita_id').on(table.citaId),
    createdAtIdx: index('idx_whatsapp_logs_created_at').on(table.createdAt)
  })
);

export type WhatsAppLog = typeof whatsappLogs.$inferSelect;
export type NewWhatsAppLog = typeof whatsappLogs.$inferInsert;
