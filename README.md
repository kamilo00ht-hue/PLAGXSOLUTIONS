# PLAGXSOLUTIONS SaaS

Plataforma SaaS premium para gestión profesional de control de plagas, ahora con backend real usando tRPC + Drizzle + PostgreSQL.

## Stack principal
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- tRPC
- Drizzle ORM
- PostgreSQL

## Branding (fijo)
- Azul oscuro: `#0A192F`
- Cian: `#00F5FF`
- Violeta: `#7B2CBF`

## Arquitectura principal
```text
src/
  app/
  components/
  features/
  hooks/
  lib/
  types/
  server/
    api/
      routers/
    db/
    services/
```

## Backend SaaS implementado
- DB PostgreSQL en `src/server/db/schema.ts` y `src/server/db/index.ts`.
- tRPC context/base en `src/server/api/trpc.ts`.
- Routers en:
  - `clients`
  - `services`
  - `schedule`
  - `technicians`
  - `reports`
- Root router en `src/server/api/root.ts`.
- Endpoint HTTP tRPC en `src/app/api/trpc/[trpc]/route.ts`.

## Módulos de dashboard conectados a backend
- Clients: CRUD real con tRPC.
- Schedule: creación y consulta mensual de citas.
- Services: listado real y cambio de estado.
- Reports: métricas calculadas desde DB.
- Dashboard: KPIs reales.

## Variables de entorno
Copiar `.env.example` como `.env`:
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/plagxsolutions
```

## Ejecución
```bash
npm install
npm run dev
```

## Validación
```bash
npm run typecheck
npm run build
```

## Módulos académicos preservados
Se mantienen aislados y sin mezclar con la app SaaS principal:
- `standalone-java/`
- `web-java/`
- `mobile-android/`
- `database/`
