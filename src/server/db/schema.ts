import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const planEnum = pgEnum('plan', ['FREE', 'PRO', 'ENTERPRISE']);
export const userRoleEnum = pgEnum('user_role', ['OWNER', 'ADMIN', 'TECHNICIAN']);
export const appointmentStatusEnum = pgEnum('appointment_status', ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
export const clientTypeEnum = pgEnum('client_type', ['RESIDENTIAL', 'COMMERCIAL']);

export const companies = pgTable('companies', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  name: varchar('name', { length: 150 }).notNull(),
  nit: varchar('nit', { length: 40 }).notNull(),
  plan: planEnum('plan').notNull().default('FREE'),
  subscriptionId: varchar('subscription_id', { length: 120 }),
  subscriptionActive: boolean('subscription_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('TECHNICIAN'),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

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
});

export const technicians = pgTable('technicians', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 120 }).notNull(),
  phone: varchar('phone', { length: 25 }).notNull(),
  email: varchar('email', { length: 150 }).notNull(),
  isActive: boolean('is_active').default(true).notNull()
});

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  technicianId: uuid('technician_id').references(() => technicians.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 120 }).notNull(),
  pestType: varchar('pest_type', { length: 120 }).notNull(),
  status: appointmentStatusEnum('status').notNull().default('PENDING'),
  baseCost: integer('base_cost').notNull().default(0),
  estimatedDurationMinutes: integer('estimated_duration_minutes').notNull().default(60),
  serviceDate: timestamp('service_date', { withTimezone: true }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  technicianId: uuid('technician_id').references(() => technicians.id, { onDelete: 'set null' }),
  serviceId: uuid('service_id').references(() => services.id, { onDelete: 'set null' }),
  date: varchar('date', { length: 10 }).notNull(),
  time: varchar('time', { length: 5 }).notNull(),
  status: appointmentStatusEnum('status').notNull().default('PENDING')
});

export const reports = pgTable('reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 150 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const inspectionReports = pgTable('inspection_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  appointmentId: uuid('appointment_id').notNull().references(() => appointments.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  findings: jsonb('findings').$type<Record<string, unknown>>().notNull(),
  chemicalsUsed: jsonb('chemicals_used').$type<Record<string, unknown>>().notNull(),
  photoUrls: jsonb('photo_urls').$type<string[]>().notNull().default([]),
  digitalSignature: text('digital_signature')
});
