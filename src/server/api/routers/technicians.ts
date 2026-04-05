import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { technicians } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

const input = z.object({ name: z.string().min(2), phone: z.string().min(5), email: z.string().email(), isActive: z.boolean().optional() });

export const techniciansRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => ctx.db.select().from(technicians).where(eq(technicians.organizationId, ctx.orgId))),
  create: protectedProcedure.input(input).mutation(({ ctx, input }) => ctx.db.insert(technicians).values({ ...input, organizationId: ctx.orgId }).returning()),
  update: protectedProcedure.input(input.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(technicians).set(data).where(and(eq(technicians.id, id), eq(technicians.organizationId, ctx.orgId))).returning();
  }),
  delete: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) => ctx.db.delete(technicians).where(and(eq(technicians.id, input.id), eq(technicians.organizationId, ctx.orgId))).returning())
});
