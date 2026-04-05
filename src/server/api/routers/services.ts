import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { services } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

const serviceStatus = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);

const serviceInput = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid().optional(),
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.number().int().nonnegative(),
  durationMinutes: z.number().int().min(15),
  active: z.boolean().default(true),
  status: serviceStatus.default('PENDING'),
  serviceDate: z.string(),
  notes: z.string().optional()
});

export const servicesRouter = router({
  getAllServices: protectedProcedure.query(({ ctx }) =>
    ctx.db.select().from(services).where(eq(services.organizationId, ctx.orgId))
  ),

  createService: protectedProcedure.input(serviceInput).mutation(({ ctx, input }) =>
    ctx.db.insert(services).values({
      ...input,
      organizationId: ctx.orgId,
      technicianId: input.technicianId ?? null,
      serviceDate: new Date(input.serviceDate)
    }).returning()
  ),

  updateService: protectedProcedure.input(serviceInput.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(services).set({
      ...data,
      technicianId: data.technicianId ?? null,
      serviceDate: new Date(data.serviceDate)
    }).where(and(eq(services.id, id), eq(services.organizationId, ctx.orgId))).returning();
  }),

  updateStatus: protectedProcedure.input(z.object({ id: z.string().uuid(), status: serviceStatus })).mutation(({ ctx, input }) =>
    ctx.db.update(services).set({ status: input.status }).where(and(eq(services.id, input.id), eq(services.organizationId, ctx.orgId))).returning()
  ),

  getServicesByClient: protectedProcedure.input(z.object({ clientId: z.string().uuid() })).query(({ ctx, input }) =>
    ctx.db.select().from(services).where(and(eq(services.clientId, input.clientId), eq(services.organizationId, ctx.orgId)))
  ),

  deleteService: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) =>
    ctx.db.delete(services).where(and(eq(services.id, input.id), eq(services.organizationId, ctx.orgId))).returning()
  )
});
