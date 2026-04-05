# PLAGXSOLUTIONS Web SaaS

La implementación principal del SaaS (Next.js + tRPC + NextAuth + Drizzle) vive en la raíz del repositorio (`src/`, `package.json`).

Este wrapper permite ejecutar comandos desde `apps/web`:

```bash
cd apps/web
npm run dev
npm run build
```

Los scripts delegan al proyecto raíz para no duplicar código ni romper la plataforma principal.
