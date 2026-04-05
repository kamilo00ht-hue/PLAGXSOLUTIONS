import { and, eq, gte, lt } from 'drizzle-orm';
import { z } from 'zod';
import { appointments, reports, services, technicians } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

export const reportsRouter = router({
  createReport: protectedProcedure.input(z.object({ title: z.string().min(3), description: z.string().min(3) })).mutation(({ ctx, input }) =>
    ctx.db.insert(reports).values({ ...input, organizationId: ctx.orgId }).returning()
  ),

  getAllReports: protectedProcedure.query(({ ctx }) =>
    ctx.db.select().from(reports).where(eq(reports.organizationId, ctx.orgId))
  ),

  getDashboardMetrics: protectedProcedure.query(async ({ ctx }) => {
    const startMonth = new Date();
    startMonth.setDate(1);
    startMonth.setHours(0, 0, 0, 0);

    const startDay = new Date();
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(startDay);
    endDay.setDate(endDay.getDate() + 1);

    const clientsRows = await ctx.db.query.clients.findMany({ where: (table, { eq }) => eq(table.organizationId, ctx.orgId) });
    const servicesThisMonth = await ctx.db.select().from(services).where(and(eq(services.organizationId, ctx.orgId), gte(services.serviceDate, startMonth)));
    const appointmentsToday = await ctx.db.select().from(appointments).where(
      and(eq(appointments.organizationId, ctx.orgId), gte(appointments.appointmentDate, startDay), lt(appointments.appointmentDate, endDay))
    );
    const activeTechnicians = await ctx.db.select().from(technicians).where(and(eq(technicians.organizationId, ctx.orgId), eq(technicians.isActive, true)));

    return {
      totalClients: clientsRows.length,
      servicesThisMonth: servicesThisMonth.length,
      appointmentsToday: appointmentsToday.length,
      activeTechnicians: activeTechnicians.length
    };
  })
});
