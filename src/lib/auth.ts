import { eq } from 'drizzle-orm';
import { compare, hash } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { db } from '@/server/db';
import { companies, users } from '@/server/db/schema';

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });

export const registerSchema = z.object({
  organizationId: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['OWNER', 'ADMIN', 'TECHNICIAN']).default('TECHNICIAN')
});

export async function registerUser(input: z.infer<typeof registerSchema>) {
  const parsed = registerSchema.parse(input);
  const existingRows = await db.select().from(users).where(eq(users.email, parsed.email));
  if (existingRows[0]) {
    throw new Error('Email already registered');
  }

  const password = await hash(parsed.password, 12);
  const created = await db.insert(users).values({
    organizationId: parsed.organizationId,
    email: parsed.email,
    password,
    role: parsed.role
  }).returning();

  return created[0];
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const rows = await db.select().from(users).where(eq(users.email, parsed.data.email));
        const user = rows[0];
        if (!user) return null;

        const validPassword = await compare(parsed.data.password, user.password);
        if (!validPassword) return null;

        const companyRows = await db.select().from(companies).where(eq(companies.id, user.organizationId));
        const company = companyRows[0];

        return {
          id: user.id,
          email: user.email,
          userId: user.id,
          role: user.role,
          companyId: user.organizationId,
          subscriptionActive: company?.subscriptionActive ?? false
        };
      }
    })
  ],
  pages: { signIn: '/login' },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.userId;
        token.role = user.role;
        token.companyId = user.companyId;
        token.subscriptionActive = user.subscriptionActive;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.userId = token.userId as string;
        session.user.role = token.role as string;
        session.user.companyId = token.companyId as string;
        session.user.subscriptionActive = Boolean(token.subscriptionActive);
      }
      return session;
    }
  }
});
