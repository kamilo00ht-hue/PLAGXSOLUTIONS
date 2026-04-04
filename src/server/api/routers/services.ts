import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { services } from '@/server/db/schema';
import { publicProcedure, router } from '@/server/api/trpc';

const serviceInput = z.object({
  clientId: z.string().uuid(),
  technicianId: z.string().uuid(),
  pestType: z.string().min(2),
  status: z.enum(['Scheduled', 'In Progress', 'Completed', 'Cancelled']),
  serviceDate: z.string(),
  notes: z.string().optional()
});

export const servicesRouter = router({
  createService: publicProcedure.input(serviceInput).mutation(({ ctx, input }) => ctx.db.insert(services).values({ ...input, serviceDate: new Date(input.serviceDate) }).returning()),
  updateStatus: publicProcedure.input(z.object({ id: z.string().uuid(), status: z.enum(['Scheduled', 'In Progress', 'Completed', 'Cancelled']) })).mutation(({ ctx, input }) => ctx.db.update(services).set({ status: input.status }).where(eq(services.id, input.id)).returning()),
  getServicesByClient: publicProcedure.input(z.object({ clientId: z.string().uuid() })).query(({ ctx, input }) => ctx.db.select().from(services).where(eq(services.clientId, input.clientId))),
  getAllServices: publicProcedure.query(({ ctx }) => ctx.db.select().from(services)),
  getByClientAndStatus: publicProcedure.input(z.object({ clientId: z.string().uuid(), status: z.string() })).query(({ ctx, input }) => ctx.db.select().from(services).where(and(eq(services.clientId, input.clientId), eq(services.status, input.status))))
});
