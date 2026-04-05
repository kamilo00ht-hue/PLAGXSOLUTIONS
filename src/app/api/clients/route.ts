import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { requireApiAuth } from '@/server/auth/apiAuth';
import { db } from '@/server/db';
import { clients } from '@/server/db/schema';
import { createClientSchema } from '@/server/validators/api';
import { fail, ok, withApiErrorHandling } from '@/server/api/http/response';

export async function GET(req: NextRequest) {
  return withApiErrorHandling(async () => {
    const auth = requireApiAuth(req);
    if (!auth) return fail('Unauthorized', 'UNAUTHORIZED', 401);

    const rows = await db.select().from(clients).where(eq(clients.organizationId, auth.companyId));
    return { items: rows };
  });
}

export async function POST(req: NextRequest) {
  return withApiErrorHandling(async () => {
    const auth = requireApiAuth(req);
    if (!auth) return fail('Unauthorized', 'UNAUTHORIZED', 401);

    const payload = createClientSchema.safeParse(await req.json().catch(() => null));
    if (!payload.success) return fail('Invalid payload', 'VALIDATION_ERROR', 400);

    const created = await db.insert(clients).values({
      ...payload.data,
      organizationId: auth.companyId
    }).returning();

    return ok(created[0], 201);
  });
}
