import { and, eq, gte } from 'drizzle-orm';
import { z } from 'zod';
import { appointments, clients, reports, services } from '@/server/db/schema';
import { publicProcedure, router } from '@/server/api/trpc';

export const reportsRouter = router({
  createReport: publicProcedure.input(z.object({ title: z.string().min(3), description: z.string().min(3) })).mutation(({ ctx, input }) => ctx.db.insert(reports).values(input).returning()),
  getAllReports: publicProcedure.query(({ ctx }) => ctx.db.select().from(reports)),
  getDashboardMetrics: publicProcedure.query(async ({ ctx }) => {
    const startMonth = new Date();
    startMonth.setDate(1);
    startMonth.setHours(0, 0, 0, 0);

    const today = new Date().toISOString().slice(0, 10);

    const totalClientsRows = await ctx.db.select().from(clients);
    const activeServices = await ctx.db.select().from(services).where(and(eq(services.status, 'In Progress')));
    const completedMonth = await ctx.db.select().from(services).where(and(eq(services.status, 'Completed'), gte(services.serviceDate, startMonth)));
    const appointmentsToday = await ctx.db.select().from(appointments).where(eq(appointments.date, today));

    return {
      totalClients: totalClientsRows.length,
      activeServices: activeServices.length,
      servicesCompletedThisMonth: completedMonth.length,
      appointmentsToday: appointmentsToday.length
    };
  })
});
