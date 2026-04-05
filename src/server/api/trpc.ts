import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { auth } from '@/lib/auth';
import { db } from '@/server/db';

const requestBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_PER_MINUTE = 240;

function enforceRateLimit(key: string) {
  const now = Date.now();
  const bucket = requestBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + 60_000 });
    return;
  }

  if (bucket.count >= RATE_LIMIT_PER_MINUTE) {
    throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'Rate limit exceeded' });
  }

  bucket.count += 1;
}

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
  if (!user?.userId || !user.companyId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  if (!user.subscriptionActive) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Subscription inactive' });
  }

  enforceRateLimit(`${user.companyId}:${user.userId}`);

  return next({
    ctx: {
      ...ctx,
      orgId: user.companyId,
      role: user.role,
      userId: user.userId
    }
  });
});
