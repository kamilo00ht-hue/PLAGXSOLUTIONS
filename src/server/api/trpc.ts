import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { db } from '@/server/db';

export const createTRPCContext = async () => ({ db });
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;
