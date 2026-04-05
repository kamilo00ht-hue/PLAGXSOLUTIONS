import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { db } from '@/server/db';
import { companies, users } from '@/server/db/schema';
import { createApiToken } from '@/server/auth/token';
import { fail, ok, withApiErrorHandling } from '@/server/api/http/response';
import { loginSchema } from '@/server/validators/api';

export async function POST(request: Request) {
  return withApiErrorHandling(async () => {
    const parsed = loginSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return fail('Invalid payload', 'VALIDATION_ERROR', 400);
    }

    const rows = await db.select().from(users).where(eq(users.email, parsed.data.email));
    const user = rows[0];
    if (!user) {
      return fail('Invalid credentials', 'UNAUTHORIZED', 401);
    }

    const validPassword = await compare(parsed.data.password, user.password);
    if (!validPassword) {
      return fail('Invalid credentials', 'UNAUTHORIZED', 401);
    }

    const companyRows = await db.select().from(companies).where(eq(companies.id, user.organizationId));
    const company = companyRows[0];

    const token = createApiToken({
      userId: user.id,
      companyId: user.organizationId,
      role: user.role,
      subscriptionActive: company?.subscriptionActive ?? false
    });

    return ok({
      token,
      userId: user.id,
      companyId: user.organizationId,
      role: user.role,
      subscriptionActive: company?.subscriptionActive ?? false
    });
  });
}
