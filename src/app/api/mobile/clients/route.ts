import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/server/db';
import { clients } from '@/server/db/schema';

export async function GET() {
  const session = await auth();
  const orgId = session?.user?.companyId;

  if (!orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await db.select().from(clients).where(eq(clients.organizationId, orgId));
  return NextResponse.json(rows);
}
