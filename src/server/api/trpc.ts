import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { auth } from '@/lib/auth';
import { db } from '@/server/db';

export const createTRPCContext = async () => {
  const session = await auth();
  return { db, session };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const user = ctx.session?.user;
  if (!user?.id || !user.companyId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  if (!user.subscriptionActive) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Subscription inactive' });
  }

  return next({
    ctx: {
      ...ctx,
      orgId: user.companyId,
      role: user.role
    }
  });
});
