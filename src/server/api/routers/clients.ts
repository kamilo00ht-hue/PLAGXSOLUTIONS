import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { clients } from '@/server/db/schema';
import { protectedProcedure, router } from '@/server/api/trpc';

const clientInput = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  address: z.string().min(4),
  isActive: z.boolean().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  clientType: z.enum(['RESIDENTIAL', 'COMMERCIAL']).optional()
});

export const clientsRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => ctx.db.select().from(clients).where(eq(clients.organizationId, ctx.orgId))),
  getAllClients: protectedProcedure.query(({ ctx }) => ctx.db.select().from(clients).where(eq(clients.organizationId, ctx.orgId))),
  getById: protectedProcedure.input(z.object({ id: z.string().uuid() })).query(({ ctx, input }) => ctx.db.select().from(clients).where(and(eq(clients.id, input.id), eq(clients.organizationId, ctx.orgId)))),
  create: protectedProcedure.input(clientInput).mutation(({ ctx, input }) => ctx.db.insert(clients).values({ ...input, organizationId: ctx.orgId }).returning()),
  createClient: protectedProcedure.input(clientInput).mutation(({ ctx, input }) => ctx.db.insert(clients).values({ ...input, organizationId: ctx.orgId }).returning()),
  update: protectedProcedure.input(clientInput.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(clients).set(data).where(and(eq(clients.id, id), eq(clients.organizationId, ctx.orgId))).returning();
  }),
  updateClient: protectedProcedure.input(clientInput.extend({ id: z.string().uuid() })).mutation(({ ctx, input }) => {
    const { id, ...data } = input;
    return ctx.db.update(clients).set(data).where(and(eq(clients.id, id), eq(clients.organizationId, ctx.orgId))).returning();
  }),
  delete: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) => ctx.db.delete(clients).where(and(eq(clients.id, input.id), eq(clients.organizationId, ctx.orgId))).returning()),
  deleteClient: protectedProcedure.input(z.object({ id: z.string().uuid() })).mutation(({ ctx, input }) => ctx.db.delete(clients).where(and(eq(clients.id, input.id), eq(clients.organizationId, ctx.orgId))).returning())
});
