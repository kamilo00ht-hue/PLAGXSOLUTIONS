import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { requireApiAuth } from '@/server/auth/apiAuth';
import { db } from '@/server/db';
import { services } from '@/server/db/schema';

export async function GET(req: NextRequest) {
  const auth = requireApiAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await db.select().from(services).where(eq(services.organizationId, auth.companyId));
  return NextResponse.json(rows);
}
