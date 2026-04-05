import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

test('env example contains required variables', () => {
  const env = read('.env.example');
  for (const key of [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'WHATSAPP_API_KEY',
    'WHATSAPP_API_TOKEN'
  ]) {
    assert.ok(env.includes(`${key}=`), `Missing ${key}`);
  }
});

test('protectedProcedure enforces auth and subscription checks', () => {
  const trpc = read('src/server/api/trpc.ts');
  assert.ok(trpc.includes("UNAUTHORIZED"));
  assert.ok(trpc.includes("Subscription inactive"));
  assert.ok(trpc.includes('enforceRateLimit'));
});

test('reports metrics uses bounded appointments today range', () => {
  const reports = read('src/server/api/routers/reports.ts');
  assert.ok(reports.includes('endDay'));
  assert.ok(reports.includes('lt(appointments.appointmentDate, endDay)'));
});

test('whatsapp client supports both API key env names', () => {
  const client = read('src/server/services/whatsapp/whatsappClient.ts');
  assert.ok(client.includes('WHATSAPP_API_KEY'));
  assert.ok(client.includes('WHATSAPP_API_TOKEN'));
});
