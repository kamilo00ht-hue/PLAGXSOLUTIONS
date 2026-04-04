import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { clients } from '@/server/db/schema';
import { publicProcedure, router } from '@/server/api/trpc';

const clientInput = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  address: z.string().min(4),
  isActive: z.boolean().optional()
});

export const clientsRouter = router({
  getAll: publicProcedure.query(({ ctx }) => ctx.db.select().from(clients)),
  getById: publicProcedure.input(z.object({ id: z.string().uuid() })).query(({ ctx, input }) => ctx.db.select().from(clients).where(eq(clients.id, input.id))),
  create: publicProcedure.input(clientInput).mutation(({ ctx, input }) => ctx.db.insert(clients).values(input).returning()),
  update: publicProcedure.input(clientInput.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(clients).set(data).where(eq(clients.id, id)).returning();
  }),
  delete: publicProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) => ctx.db.delete(clients).where(eq(clients.id, input.id)).returning())
});
