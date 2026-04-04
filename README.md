# PLAGXSOLUTIONS SaaS

Plataforma SaaS premium para gestión profesional de control de plagas con experiencia dark-first empresarial.

## Stack principal
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Base preparada para shadcn/ui y backend tipado

## Branding (fijo)
- Azul oscuro: `#0A192F`
- Cian: `#00F5FF`
- Violeta: `#7B2CBF`

## Arquitectura principal
```text
src/
  app/
    (landing)/
    (dashboard)/
    layout.tsx
    globals.css
  components/
    ui/
    layout/
    dashboard/
    features/
  features/
    clients/
    dashboard/
    reports/
    schedule/
    services/
    settings/
  lib/
  hooks/
  types/
  server/
    api/
    db/
    services/
```

## Módulos funcionales listos
- Landing SaaS premium (Hero, Problem, Solution, Services, How It Works, Benefits, CTA).
- Dashboard con KPIs y navegación privada.
- Clients con CRUD completo (crear, editar, eliminar, listar y filtrar).
- Schedule con agenda diaria + vista mensual simple.
- Services con operación por tipo de plaga/estado/técnico.
- Reports con métricas y bloque de preparación para exportación.
- Settings con configuración base operacional.

## Ejecución
```bash
npm install
npm run dev
```

Abrir en `http://localhost:3000`.

## Validación recomendada
```bash
npm run typecheck
npm run build
```

## Módulos académicos preservados
Se mantienen aislados para fines de evidencia SENA y no bloquean la app SaaS principal:
- `standalone-java/`
- `web-java/`
- `mobile-android/`
- `database/`
