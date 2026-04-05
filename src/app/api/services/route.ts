import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { requireApiAuth } from '@/server/auth/apiAuth';
import { db } from '@/server/db';
import { services } from '@/server/db/schema';
import { fail, withApiErrorHandling } from '@/server/api/http/response';

export async function GET(req: NextRequest) {
  return withApiErrorHandling(async () => {
    const auth = requireApiAuth(req);
    if (!auth) return fail('Unauthorized', 'UNAUTHORIZED', 401);

    const rows = await db.select().from(services).where(eq(services.organizationId, auth.companyId));
    return { items: rows };
  });
}
