# GA8-220501096-AA1-EV02 — Documento técnico de módulos integrados

## 1) Objetivo
Integrar `AuthModule` y `ReportModule` para que cada reporte de fumigación registre automáticamente la autoría del usuario autenticado (JWT), evitando manipulación manual del autor y garantizando trazabilidad.

## 2) Arquitectura de carpetas (backend)
```text
backend/src
├── app.module.ts
├── auth
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards
│   │   └── jwt-auth.guard.ts
│   └── strategies
│       └── jwt.strategy.ts
├── reports
│   ├── dto
│   │   ├── create-report.dto.ts
│   │   └── update-report.dto.ts
│   ├── entities
│   │   └── report.entity.ts
│   ├── report.controller.ts
│   ├── report.module.ts
│   └── report.service.ts
└── users
    ├── entities
    │   └── user.entity.ts
    ├── users.module.ts
    └── users.service.ts
```

## 3) Integración AuthModule ↔ ReportModule
### Flujo técnico
1. `POST /auth/login` valida credenciales y emite JWT con `sub`, `email`, `role`.
2. `JwtAuthGuard` protege `POST /reports`.
3. `JwtStrategy.validate()` inyecta `request.user`.
4. `ReportController.create()` toma `request.user` y lo envía a `ReportService.create(dto, author)`.
5. `ReportService` persiste el reporte con campo `autor` (userId, email, role).

### Beneficios (SENA + buenas prácticas)
- **SRP**: autenticación en `auth`, negocio de reportes en `reports`.
- **Open/Closed**: el DTO no expone autoría editable desde cliente.
- **Seguridad**: la autoría deriva del token, no del body.
- **Auditoría**: trazabilidad por técnico en cada fumigación.

## 4) Descripción de API (resumen)
### Auth
- `POST /auth/register`: crea usuarios (`admin`, `tecnico`, `cliente`).
- `POST /auth/login`: retorna `accessToken` tipo Bearer.

### Reports (JWT requerido)
- `POST /reports`: crea reporte y asigna autor del token.
- `GET /reports`: lista reportes.
- `GET /reports/:id`: consulta por ID.
- `PUT /reports/:id`: actualiza estado/datos operativos.
- `DELETE /reports/:id`: elimina reporte.

## 5) Modelo de datos (entidades NestJS)
### User
- `id: number`
- `name: string`
- `email: string`
- `passwordHash: string`
- `role: 'admin' | 'tecnico' | 'cliente'`

### Report
- `id: number`
- `cliente: string`
- `fechaServicio: string (ISO)`
- `tipoPlaga: string`
- `tecnicoResponsable: string`
- `estado: pendiente | en_proceso | completado`
- `autor: { userId: number; email: string; role: string }`
- `createdAt: string (ISO)`
- `updatedAt: string (ISO)`

## 6) Escenario de negocio (control de plagas)
Cuando un técnico autenticado registra una fumigación para un restaurante o bodega, el sistema conserva automáticamente la autoría para auditoría interna, seguimiento de calidad del servicio y evidencia frente al cliente.
