import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const createClientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  address: z.string().min(4),
  isActive: z.boolean().optional()
});

export const createAppointmentSchema = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  date: z.string().datetime(),
  time: z.string().min(4),
  status: z.enum(['scheduled', 'completed', 'cancelled']).default('scheduled')
});
