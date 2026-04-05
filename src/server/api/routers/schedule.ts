import { and, eq, gte, lt } from 'drizzle-orm';
import { z } from 'zod';
import { appointments } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

const scheduleStatus = z.enum(['scheduled', 'completed', 'cancelled']);

const appointmentInput = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  date: z.string().datetime(),
  time: z.string().min(4),
  status: scheduleStatus.default('scheduled')
});

const toDbStatus = (status: z.infer<typeof scheduleStatus>) => {
  if (status === 'completed') return 'COMPLETED' as const;
  if (status === 'cancelled') return 'CANCELLED' as const;
  return 'PENDING' as const;
};

const fromDbStatus = (status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED') => {
  if (status === 'COMPLETED') return 'completed';
  if (status === 'CANCELLED') return 'cancelled';
  return 'scheduled';
};

export const scheduleRouter = router({
  createAppointment: protectedProcedure.input(appointmentInput).mutation(({ ctx, input }) =>
    ctx.db.insert(appointments).values({
      organizationId: ctx.orgId,
      clientId: input.clientId,
      technicianId: input.technicianId ?? null,
      serviceId: input.serviceId ?? null,
      appointmentDate: new Date(input.date),
      time: input.time,
      status: toDbStatus(input.status)
    }).returning()
  ),

  updateAppointment: protectedProcedure.input(appointmentInput.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(appointments).set({
      clientId: data.clientId,
      technicianId: data.technicianId ?? null,
      serviceId: data.serviceId ?? null,
      appointmentDate: new Date(data.date),
      time: data.time,
      status: toDbStatus(data.status)
    }).where(and(eq(appointments.id, id), eq(appointments.organizationId, ctx.orgId))).returning();
  }),

  deleteAppointment: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) =>
    ctx.db.delete(appointments).where(and(eq(appointments.id, input.id), eq(appointments.organizationId, ctx.orgId))).returning()
  ),

  getMonthlySchedule: protectedProcedure.input(z.object({ month: z.string().regex(/^\d{4}-\d{2}$/) })).query(async ({ ctx, input }) => {
    const start = new Date(`${input.month}-01T00:00:00.000Z`);
    const end = new Date(start);
    end.setUTCMonth(end.getUTCMonth() + 1);

    const rows = await ctx.db.select().from(appointments)
      .where(and(eq(appointments.organizationId, ctx.orgId), gte(appointments.appointmentDate, start), lt(appointments.appointmentDate, end)));

    return rows.reduce<Record<string, Array<{ id: string; time: string; status: z.infer<typeof scheduleStatus>; clientId: string; technicianId: string | null; serviceId: string | null }>>>((acc, row) => {
      const day = row.appointmentDate.toISOString().slice(0, 10);
      const item = {
        id: row.id,
        time: row.time,
        status: fromDbStatus(row.status),
        clientId: row.clientId,
        technicianId: row.technicianId,
        serviceId: row.serviceId
      };
      acc[day] = acc[day] ? [...acc[day], item] : [item];
      return acc;
    }, {});
  })
});
