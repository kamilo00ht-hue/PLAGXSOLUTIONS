# PLAGXSOLUTIONS Technical Audit Report

Date: 2026-04-05

## 1) Repository analysis

### Structure reviewed
- Next.js app under `src/app`
- tRPC routers under `src/server/api/routers`
- Drizzle schema under `src/server/db/schema.ts`
- Auth under `src/lib/auth.ts`
- Integrations under `src/server/services/{stripe,whatsapp}`
- Multiplatform clients under `apps/mobile-android` and `apps/standalone-java`
- Shared API client under `packages/api-client`

### Findings
- **Architecture**: multi-tenant model exists and is consistent in the DB schema (`organizationId` in operational tables).
- **Tenant isolation**: protected tRPC routers filter by `organizationId`.
- **Security checks present**: auth + subscription checks in tRPC middleware.
- **Repository cleanup applied**: duplicate legacy roots (`mobile-android`, `standalone-java`, `web-java`) removed in favor of canonical `apps/*` structure.
- **Main blocker**: dependency installation is blocked by environment policy (`npm install` returns 403), preventing runtime/build verification.

### Potential code quality risks found
- In-memory rate limit map may grow unbounded without cleanup (fixed in this PR with periodic GC).
- Dashboard metric `appointmentsToday` previously counted future appointments too (fixed with end-of-day bound).
- Environment variable naming mismatch (`NEXTAUTH_SECRET` vs `AUTH_SECRET`, `WHATSAPP_API_KEY` vs `WHATSAPP_API_TOKEN`) could break production config (fixed by compatibility fallback + `.env.example` update).

## 2) Dependency and runtime diagnostics

Commands executed:
- `npm install` → fails with `403 Forbidden` for `@tanstack/react-query`.
- `HTTPS_PROXY= HTTP_PROXY= npm install --https-proxy= --proxy=` → same `403 Forbidden`, confirming registry/policy block instead of local proxy misconfiguration.
- `npm run typecheck` → fails because packages are not installed.
- `npm run dev` / `npm run build` → fail because `next` binary is missing (not installed due above).
- `node --test tests/platform-guardrails.test.mjs` → passes (static guardrail checks for env/auth/metrics/WhatsApp compatibility).

## 3) Security review summary

- ✅ Password hashing with bcrypt in registration flow.
- ✅ JWT/session include tenant + role + subscription state.
- ✅ ProtectedProcedure enforces authentication + subscriptionActive.
- ✅ Tenant isolation by `organizationId` in routers.
- ✅ Input validation with Zod on routers.
- ⚠️ Rate limiting is process-local (single-node only). For production, move to Redis-based distributed limits.

## 4) Production readiness recommendations

1. Unblock npm registry access (allow scoped packages, especially `@tanstack/*`, `@trpc/*`).
2. Run full CI: install, typecheck, lint, tests, build.
3. Add integration tests for auth, tenant isolation, and CRUD flows.
   - Current repository now includes basic guardrail tests under `tests/platform-guardrails.test.mjs`.
4. Add DB migrations and seed script.
5. Replace pseudo-PDF export implementation with real PDF generator library.
6. Move rate limiting and background jobs (WhatsApp reminders) to durable infra.

## 5) Conclusion

Repository architecture is directionally correct for a multi-tenant SaaS, but **final verification is currently blocked by environment dependency policy**. Once package installation is unblocked, run CI/build/test gates immediately.
