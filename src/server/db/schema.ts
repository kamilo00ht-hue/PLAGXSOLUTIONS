import { boolean, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const planEnum = pgEnum('plan', ['FREE', 'PRO', 'ENTERPRISE']);
export const userRoleEnum = pgEnum('user_role', ['OWNER', 'ADMIN', 'TECHNICIAN']);
export const appointmentStatusEnum = pgEnum('appointment_status', ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
export const clientTypeEnum = pgEnum('client_type', ['RESIDENTIAL', 'COMMERCIAL']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED']);
export const whatsappLogStatusEnum = pgEnum('whatsapp_log_status', ['SENT', 'FAILED']);

export const companies = pgTable('companies', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  name: varchar('name', { length: 150 }).notNull(),
  nit: varchar('nit', { length: 40 }).notNull(),
  plan: planEnum('plan').notNull().default('FREE'),
  subscriptionId: varchar('subscription_id', { length: 120 }),
  subscriptionActive: boolean('subscription_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  createdAtIdx: index('companies_created_at_idx').on(table.createdAt)
}));

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('TECHNICIAN'),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('users_organization_id_idx').on(table.organizationId),
  createdAtIdx: index('users_created_at_idx').on(table.createdAt)
}));

export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  phone: varchar('phone', { length: 25 }).notNull(),
  address: text('address').notNull(),
  lat: varchar('lat', { length: 50 }),
  lng: varchar('lng', { length: 50 }),
  clientType: clientTypeEnum('client_type').notNull().default('RESIDENTIAL'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('clients_organization_id_idx').on(table.organizationId),
  createdAtIdx: index('clients_created_at_idx').on(table.createdAt)
}));

export const technicians = pgTable('technicians', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 120 }).notNull(),
  phone: varchar('phone', { length: 25 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('technicians_organization_id_idx').on(table.organizationId),
  createdAtIdx: index('technicians_created_at_idx').on(table.createdAt)
}));

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  technicianId: uuid('technician_id').references(() => technicians.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 120 }).notNull(),
  description: text('description').notNull(),
  price: integer('price').notNull().default(0),
  durationMinutes: integer('duration_minutes').notNull().default(60),
  active: boolean('active').notNull().default(true),
  status: appointmentStatusEnum('status').notNull().default('PENDING'),
  serviceDate: timestamp('service_date', { withTimezone: true }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('services_organization_id_idx').on(table.organizationId),
  clientIdIdx: index('services_client_id_idx').on(table.clientId),
  createdAtIdx: index('services_created_at_idx').on(table.createdAt)
}));

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  technicianId: uuid('technician_id').references(() => technicians.id, { onDelete: 'set null' }),
  serviceId: uuid('service_id').references(() => services.id, { onDelete: 'set null' }),
  appointmentDate: timestamp('appointment_date', { withTimezone: true }).notNull(),
  time: varchar('time', { length: 5 }).notNull(),
  status: appointmentStatusEnum('status').notNull().default('PENDING'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('appointments_organization_id_idx').on(table.organizationId),
  clientIdIdx: index('appointments_client_id_idx').on(table.clientId),
  appointmentDateIdx: index('appointments_appointment_date_idx').on(table.appointmentDate),
  createdAtIdx: index('appointments_created_at_idx').on(table.createdAt)
}));

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 150 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('reports_organization_id_idx').on(table.organizationId),
  createdAtIdx: index('reports_created_at_idx').on(table.createdAt)
}));

export const inspectionReports = pgTable('inspection_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  appointmentId: uuid('appointment_id').notNull().references(() => appointments.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  serviceId: uuid('service_id').notNull().references(() => services.id, { onDelete: 'cascade' }),
  technicianId: uuid('technician_id').references(() => technicians.id, { onDelete: 'set null' }),
  observations: text('observations').notNull(),
  recommendations: text('recommendations').notNull(),
  photos: jsonb('photos').$type<string[]>().notNull().default([]),
  signature: text('signature'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('inspection_reports_organization_id_idx').on(table.organizationId),
  clientIdIdx: index('inspection_reports_client_id_idx').on(table.clientId),
  createdAtIdx: index('inspection_reports_created_at_idx').on(table.createdAt)
}));

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 120 }).notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 120 }).notNull().unique(),
  plan: planEnum('plan').notNull(),
  status: subscriptionStatusEnum('status').notNull().default('TRIALING'),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('subscriptions_organization_id_idx').on(table.organizationId),
  createdAtIdx: index('subscriptions_created_at_idx').on(table.createdAt)
}));

export const whatsappLogs = pgTable('whatsapp_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  appointmentId: uuid('appointment_id').references(() => appointments.id, { onDelete: 'set null' }),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'set null' }),
  technicianId: uuid('technician_id').references(() => technicians.id, { onDelete: 'set null' }),
  phoneTo: varchar('phone_to', { length: 25 }).notNull(),
  messageType: varchar('message_type', { length: 40 }).notNull(),
  message: text('message').notNull(),
  status: whatsappLogStatusEnum('status').notNull().default('SENT'),
  providerMessageId: varchar('provider_message_id', { length: 120 }),
  providerError: text('provider_error'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => ({
  organizationIdIdx: index('whatsapp_logs_organization_id_idx').on(table.organizationId),
  createdAtIdx: index('whatsapp_logs_created_at_idx').on(table.createdAt)
}));
