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
```

## Setup
```bash
cp .env.example .env
npm install
npm run db:push
npm run dev
```

## Producción
Ver `DEPLOYMENT.md` y `Dockerfile`.
