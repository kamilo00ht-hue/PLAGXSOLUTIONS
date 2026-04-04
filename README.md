# PLAGXSOLUTIONS SaaS Platform

Plataforma SaaS premium para gestión empresarial de control de plagas, diseñada con enfoque moderno tipo Stripe/Vercel/Linear.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (componentes base)
- Framer Motion

## Branding (bloqueado)
- Azul oscuro principal: `#0A192F`
- Acento cian: `#00F5FF`
- Acento violeta: `#7B2CBF`

## Estructura principal
```text
src/
├── app/
│   ├── (landing)/
│   ├── (dashboard)/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   └── features/
├── features/
│   ├── clients/
│   ├── services/
│   ├── schedule/
│   ├── reports/
│   └── dashboard/
├── lib/
├── hooks/
└── types/
```

## Qué incluye esta versión
- Landing pública premium con secciones: Hero, Problem, Solution, Services, How It Works, Benefits y CTA final.
- Dashboard privado con sidebar y módulos principales.
- Módulo funcional **Dashboard** con KPIs empresariales.
- Módulo funcional **Clients** con CRUD (crear, editar, eliminar y listar).
- Componentes reutilizables clave: Button, Card, Input, Table, Modal.

## Ejecución
```bash
npm install
npm run dev
```

Abrir en `http://localhost:3000`.

## Notas de arquitectura
- UI orientada a producto SaaS dark-premium.
- Tipografías: Inter + Space Grotesk.
- Animaciones con Framer Motion en landing, cards y modal.
