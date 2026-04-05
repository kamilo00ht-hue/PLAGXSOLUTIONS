import { and, eq, gte } from 'drizzle-orm';
import { z } from 'zod';
import { appointments, reports, services } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

export const reportsRouter = router({
  createReport: protectedProcedure.input(z.object({ title: z.string().min(3), description: z.string().min(3) })).mutation(({ ctx, input }) =>
    ctx.db.insert(reports).values({ ...input, organizationId: ctx.orgId }).returning()
  ),
  getAllReports: protectedProcedure.query(({ ctx }) => ctx.db.select().from(reports).where(eq(reports.organizationId, ctx.orgId))),
  getDashboardMetrics: protectedProcedure.query(async ({ ctx }) => {
    const startMonth = new Date();
    startMonth.setDate(1);
    startMonth.setHours(0, 0, 0, 0);
    const today = new Date().toISOString().slice(0, 10);

    const clientsRows = await ctx.db.query.clients.findMany({ where: (table, { eq }) => eq(table.organizationId, ctx.orgId) });
    const activeServices = await ctx.db.select().from(services).where(and(eq(services.organizationId, ctx.orgId), eq(services.status, 'IN_PROGRESS')));
    const completedMonth = await ctx.db.select().from(services).where(and(eq(services.organizationId, ctx.orgId), eq(services.status, 'COMPLETED'), gte(services.serviceDate, startMonth)));
    const appointmentsToday = await ctx.db.select().from(appointments).where(and(eq(appointments.organizationId, ctx.orgId), eq(appointments.date, today)));

    return {
      totalClients: clientsRows.length,
      activeServices: activeServices.length,
      servicesCompletedThisMonth: completedMonth.length,
      appointmentsToday: appointmentsToday.length
    };
  })
});
