import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiAuth } from '@/server/auth/apiAuth';
import { db } from '@/server/db';
import { clients } from '@/server/db/schema';

const createClientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  address: z.string().min(4),
  isActive: z.boolean().optional()
});

export async function GET(req: NextRequest) {
  const auth = requireApiAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await db.select().from(clients).where(eq(clients.organizationId, auth.companyId));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const auth = requireApiAuth(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = createClientSchema.safeParse(await req.json().catch(() => null));
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const created = await db.insert(clients).values({
    ...payload.data,
    organizationId: auth.companyId
  }).returning();

  return NextResponse.json(created[0], { status: 201 });
}
