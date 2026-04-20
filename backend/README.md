# PlagX Solutions Backend (NestJS + TypeScript)

## Instalación en `/backend`

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

## Endpoints

### Registro de usuario
`POST /auth/register`

```json
{
  "name": "Juan Camilo",
  "email": "juan@plagx.com",
  "password": "Segura123",
  "role": "tecnico"
}
```

### Login
`POST /auth/login`

```json
{
  "email": "juan@plagx.com",
  "password": "Segura123"
}
```

## Notas
- CORS habilitado para `http://localhost:5173`.
- Validación global activa con `ValidationPipe`.
- La conexión DB está preparada por variables de entorno para PostgreSQL o MySQL.
- Persistencia actual de usuarios en memoria; se puede migrar a TypeORM repository sin cambiar el contrato de API.
