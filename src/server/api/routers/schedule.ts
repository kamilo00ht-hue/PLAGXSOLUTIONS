import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { appointments } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

const appointmentInput = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  date: z.string().min(10),
  time: z.string().min(4),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
});

export const scheduleRouter = router({
  createAppointment: protectedProcedure.input(appointmentInput).mutation(({ ctx, input }) =>
    ctx.db.insert(appointments).values({ ...input, organizationId: ctx.orgId, technicianId: input.technicianId ?? null, serviceId: input.serviceId ?? null }).returning()
  ),
  updateAppointment: protectedProcedure.input(appointmentInput.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(appointments).set({ ...data, technicianId: data.technicianId ?? null, serviceId: data.serviceId ?? null }).where(and(eq(appointments.id, id), eq(appointments.organizationId, ctx.orgId))).returning();
  }),
  deleteAppointment: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) =>
    ctx.db.delete(appointments).where(and(eq(appointments.id, input.id), eq(appointments.organizationId, ctx.orgId))).returning()
  ),
  getMonthlySchedule: protectedProcedure.input(z.object({ month: z.string().regex(/^\d{4}-\d{2}$/) })).query(async ({ ctx, input }) => {
    const rows = await ctx.db.select().from(appointments).where(eq(appointments.organizationId, ctx.orgId));
    return rows
      .filter((row) => row.date.startsWith(input.month))
      .reduce<Record<string, typeof rows>>((acc, row) => {
        acc[row.date] = acc[row.date] ? [...acc[row.date], row] : [row];
        return acc;
      }, {});
  }),
  assignTechnician: protectedProcedure.input(z.object({ appointmentId: z.string().uuid(), technicianId: z.string().uuid() })).mutation(({ ctx, input }) =>
    ctx.db.update(appointments).set({ technicianId: input.technicianId }).where(and(eq(appointments.id, input.appointmentId), eq(appointments.organizationId, ctx.orgId))).returning()
  )
});
