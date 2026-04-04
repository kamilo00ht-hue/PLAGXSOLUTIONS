import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { appointments } from '@/server/db/schema';
import { publicProcedure, router } from '@/server/api/trpc';

const appointmentInput = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid(),
  serviceId: z.string().uuid().optional(),
  date: z.string().min(10),
  time: z.string().min(4),
  status: z.string().min(3)
});

export const scheduleRouter = router({
  createAppointment: publicProcedure.input(appointmentInput).mutation(({ ctx, input }) => ctx.db.insert(appointments).values(input).returning()),
  updateAppointment: publicProcedure.input(appointmentInput.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(appointments).set(data).where(eq(appointments.id, id)).returning();
  }),
  deleteAppointment: publicProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) => ctx.db.delete(appointments).where(eq(appointments.id, input.id)).returning()),
  getMonthlySchedule: publicProcedure.input(z.object({ month: z.string().regex(/^\d{4}-\d{2}$/) })).query(async ({ ctx, input }) => {
    const rows = await ctx.db.select().from(appointments);
    return rows.filter((row) => row.date.startsWith(input.month)).reduce<Record<string, typeof rows>>((acc, row) => {
      acc[row.date] = acc[row.date] ? [...acc[row.date], row] : [row];
      return acc;
    }, {});
  })
});
