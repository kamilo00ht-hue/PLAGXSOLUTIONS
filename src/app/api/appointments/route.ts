import { NextRequest } from 'next/server';
import { requireApiAuth } from '@/server/auth/apiAuth';
import { db } from '@/server/db';
import { appointments } from '@/server/db/schema';
import { createAppointmentSchema } from '@/server/validators/api';
import { fail, ok, withApiErrorHandling } from '@/server/api/http/response';

const toDbStatus = (status: 'scheduled' | 'completed' | 'cancelled') => status === 'completed' ? 'COMPLETED' : status === 'cancelled' ? 'CANCELLED' : 'PENDING';

export async function POST(req: NextRequest) {
  return withApiErrorHandling(async () => {
    const auth = requireApiAuth(req);
    if (!auth) return fail('Unauthorized', 'UNAUTHORIZED', 401);

    const payload = createAppointmentSchema.safeParse(await req.json().catch(() => null));
    if (!payload.success) return fail('Invalid payload', 'VALIDATION_ERROR', 400);

    const created = await db.insert(appointments).values({
      organizationId: auth.companyId,
      clientId: payload.data.clientId,
      technicianId: payload.data.technicianId ?? null,
      serviceId: payload.data.serviceId ?? null,
      appointmentDate: new Date(payload.data.date),
      time: payload.data.time,
      status: toDbStatus(payload.data.status)
    }).returning();

    return ok({ id: created[0].id }, 201);
  });
}
