import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const exists = (p) => fs.existsSync(p);

test('required multiplatform folders exist', () => {
  for (const p of ['apps/web', 'apps/standalone-java', 'apps/mobile-android', 'packages/api-client']) {
    assert.ok(exists(p), `Missing ${p}`);
  }
});

test('legacy duplicate folders were removed', () => {
  for (const p of ['mobile-android', 'standalone-java', 'web-java']) {
    assert.equal(exists(p), false, `${p} should be removed from repository root`);
  }
});

test('shared api client exposes required functions', () => {
  const content = fs.readFileSync('packages/api-client/src/index.ts', 'utf8');
  for (const fn of ['loginUser', 'getClients', 'createClient', 'getServices', 'createAppointment']) {
    assert.ok(content.includes(`${fn}:`), `Missing ${fn}`);
  }
});
