import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { technicians } from '@/server/db/schema';
import { publicProcedure, router } from '@/server/api/trpc';

const input = z.object({ name: z.string().min(2), phone: z.string().min(5), email: z.string().email(), isActive: z.boolean().optional() });

export const techniciansRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.db.select().from(technicians)),
  create: publicProcedure.input(input).mutation(({ ctx, input }) => ctx.db.insert(technicians).values(input).returning()),
  update: publicProcedure.input(input.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(technicians).set(data).where(eq(technicians.id, id)).returning();
  }),
  delete: publicProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) => ctx.db.delete(technicians).where(eq(technicians.id, input.id)).returning())
});
