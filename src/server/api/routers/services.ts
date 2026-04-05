import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { services } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

const serviceInput = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid().optional(),
  name: z.string().min(2),
  pestType: z.string().min(2),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  serviceDate: z.string(),
  notes: z.string().optional(),
  baseCost: z.number().optional(),
  estimatedDurationMinutes: z.number().optional()
});

export const servicesRouter = router({
  createService: protectedProcedure.input(serviceInput).mutation(({ ctx, input }) =>
    ctx.db.insert(services).values({
      ...input,
      technicianId: input.technicianId ?? null,
      serviceDate: new Date(input.serviceDate),
      organizationId: ctx.orgId,
      baseCost: input.baseCost ?? 0,
      estimatedDurationMinutes: input.estimatedDurationMinutes ?? 60
    }).returning()
  ),
  updateStatus: protectedProcedure.input(z.object({ id: z.string().uuid(), status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']) })).mutation(({ ctx, input }) =>
    ctx.db.update(services).set({ status: input.status }).where(and(eq(services.id, input.id), eq(services.organizationId, ctx.orgId))).returning()
  ),
  getServicesByClient: protectedProcedure.input(z.object({ clientId: z.string().uuid() })).query(({ ctx, input }) =>
    ctx.db.select().from(services).where(and(eq(services.clientId, input.clientId), eq(services.organizationId, ctx.orgId)))
  ),
  getAllServices: protectedProcedure.query(({ ctx }) => ctx.db.select().from(services).where(eq(services.organizationId, ctx.orgId)))
});
