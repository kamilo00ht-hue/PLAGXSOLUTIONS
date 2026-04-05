import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { inspectionReports } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

const inputSchema = z.object({
  appointmentId: z.string().uuid(),
  clientId: z.string().uuid(),
  serviceId: z.string().uuid(),
  technicianId: z.string().uuid().optional(),
  observations: z.string().min(3),
  recommendations: z.string().min(3),
  photos: z.array(z.string().url()).default([]),
  signature: z.string().optional()
});

export const inspectionReportsRouter = router({
  create: protectedProcedure.input(inputSchema).mutation(({ ctx, input }) =>
    ctx.db.insert(inspectionReports).values({
      ...input,
      organizationId: ctx.orgId,
      technicianId: input.technicianId ?? null,
      signature: input.signature ?? null
    }).returning()
  ),

  getAll: protectedProcedure.query(({ ctx }) =>
    ctx.db.select().from(inspectionReports).where(eq(inspectionReports.organizationId, ctx.orgId))
  ),

  getById: protectedProcedure.input(z.object({ id: z.string().uuid() })).query(async ({ ctx, input }) => {
    const rows = await ctx.db.select().from(inspectionReports).where(and(eq(inspectionReports.id, input.id), eq(inspectionReports.organizationId, ctx.orgId)));
    return rows[0] ?? null;
  }),

  delete: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) =>
    ctx.db.delete(inspectionReports).where(and(eq(inspectionReports.id, input.id), eq(inspectionReports.organizationId, ctx.orgId))).returning()
  ),

  exportPdf: protectedProcedure.input(z.object({ id: z.string().uuid() })).query(async ({ ctx, input }) => {
    const rows = await ctx.db.select().from(inspectionReports).where(and(eq(inspectionReports.id, input.id), eq(inspectionReports.organizationId, ctx.orgId)));
    const report = rows[0];
    if (!report) return null;

    const lines = [
      'PLAGXSOLUTIONS - Inspection Report',
      `Report ID: ${report.id}`,
      `Client ID: ${report.clientId}`,
      `Service ID: ${report.serviceId}`,
      `Technician ID: ${report.technicianId ?? 'N/A'}`,
      `Created At: ${report.createdAt.toISOString()}`,
      `Observations: ${report.observations}`,
      `Recommendations: ${report.recommendations}`
    ];

    const pseudoPdf = Buffer.from(lines.join('\n')).toString('base64');
    return { fileName: `inspection-${report.id}.pdf`, base64: pseudoPdf };
  })
});
