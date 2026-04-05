import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { companies, users } from '@/server/db/schema';
import { createApiToken } from '@/server/auth/token';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const rows = await db.select().from(users).where(eq(users.email, body.email));
  const user = rows[0];
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const validPassword = await compare(body.password, user.password);
  if (!validPassword) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const companyRows = await db.select().from(companies).where(eq(companies.id, user.organizationId));
  const company = companyRows[0];

  const token = createApiToken({
    userId: user.id,
    companyId: user.organizationId,
    role: user.role,
    subscriptionActive: company?.subscriptionActive ?? false
  });

  return NextResponse.json({
    token,
    userId: user.id,
    companyId: user.organizationId,
    role: user.role,
    subscriptionActive: company?.subscriptionActive ?? false
  });
}
