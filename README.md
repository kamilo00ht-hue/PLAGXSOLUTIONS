# PLAGXSOLUTIONS SaaS

Plataforma SaaS multi-tenant para empresas de control de plagas en Colombia.

## Stack
- Next.js (App Router)
- TypeScript + Tailwind CSS
- tRPC
- NextAuth (Credentials + JWT)
- Drizzle ORM + PostgreSQL
- Stripe (suscripciones)
- WhatsApp Cloud API

## Multi-tenant
Todas las tablas operativas están aisladas por `organizationId`.

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run db:generate
npm run db:push
npm run db:studio
node --test tests/platform-guardrails.test.mjs
```

## Setup
```bash
cp .env.example .env
npm install
npm run db:push
npm run dev
```

## Variables de entorno
Variables mínimas:
- `DATABASE_URL`
- `NEXTAUTH_SECRET` (se soporta `AUTH_SECRET` por compatibilidad)
- `NEXTAUTH_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `WHATSAPP_API_KEY` (se soporta `WHATSAPP_API_TOKEN` por compatibilidad)

## Troubleshooting
- Si `npm install` falla con `403 Forbidden` en paquetes `@scope/*`, valida políticas de red/proxy corporativo y allowlist del registro npm.
- Si `npm run dev` reporta `next: not found`, primero resuelve la instalación de dependencias.

## Producción
Ver `docs/DEPLOYMENT.md` y `Dockerfile`.

## Estructura monorepo
- `apps/web`: wrapper de ejecución para la app SaaS principal (código fuente en raíz: `src/`).
- `apps/standalone-java`: cliente desktop JavaFX (MVC).
- `apps/mobile-android`: cliente Android Kotlin (MVVM + Retrofit).
- `packages/api-client`: cliente HTTP compartido para integraciones multiplataforma.
- `docs/`: documentación técnica y operativa.
