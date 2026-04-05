import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiAuth } from '@/server/auth/apiAuth';
import { db } from '@/server/db';
import { appointments } from '@/server/db/schema';

const createAppointmentSchema = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  date: z.string().datetime(),
  time: z.string().min(4),
  status: z.enum(['scheduled', 'completed', 'cancelled']).default('scheduled')
});

const toDbStatus = (status: 'scheduled' | 'completed' | 'cancelled') => status === 'completed' ? 'COMPLETED' : status === 'cancelled' ? 'CANCELLED' : 'PENDING';

export async function POST(req: NextRequest) {
  const auth = requireApiAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = createAppointmentSchema.safeParse(await req.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const created = await db.insert(appointments).values({
    organizationId: auth.companyId,
    clientId: payload.data.clientId,
    technicianId: payload.data.technicianId ?? null,
    serviceId: payload.data.serviceId ?? null,
    appointmentDate: new Date(payload.data.date),
    time: payload.data.time,
    status: toDbStatus(payload.data.status)
  }).returning();

  return NextResponse.json({ id: created[0].id }, { status: 201 });
}
