import { z } from 'zod';
import { publicProcedure, router } from '@/server/api/trpc';
import { registerSchema, registerUser } from '@/lib/auth';

export const authRouter = router({
  register: publicProcedure.input(registerSchema).mutation(async ({ input }) => {
    const user = await registerUser(input);
    return { id: user.id, email: user.email, organizationId: user.organizationId, role: user.role };
  }),
  login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string().min(6) })).mutation(async ({ input }) => {
    return { ok: true, message: 'Use NextAuth signIn(credentials) from the client', email: input.email };
  }),
  logout: publicProcedure.mutation(async () => ({ ok: true, message: 'Use NextAuth signOut() from the client' }))
});
