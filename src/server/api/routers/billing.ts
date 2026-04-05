import { z } from 'zod';
import { protectedProcedure, router } from '@/server/api/trpc';
import { createCheckoutSession } from '@/server/services/stripe/subscriptions';

export const billingRouter = router({
  createCheckoutSession: protectedProcedure.input(z.object({
    plan: z.enum(['STARTER', 'PROFESSIONAL', 'ENTERPRISE']),
    successUrl: z.string().url(),
    cancelUrl: z.string().url()
  })).mutation(async ({ ctx, input }) => {
    const email = ctx.session?.user?.email;
    if (!email) {
      throw new Error('User email is required');
    }

    const session = await createCheckoutSession({
      customerEmail: email,
      plan: input.plan,
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl
    });

    return { id: session.id, url: session.url };
  })
});
