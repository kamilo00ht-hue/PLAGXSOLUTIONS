# Multiplatform Setup

## 1) Web SaaS (main system)
The existing SaaS remains in repository root.

```bash
npm install
npm run dev
```

## 2) Shared API client
Location: `packages/api-client`

Provides typed functions:
- `loginUser()`
- `getClients()`
- `createClient()`
- `getServices()`
- `createAppointment()`

Base URL is configurable via `createApiClient({ baseUrl })`.

## 3) Desktop client (JavaFX)
Location: `apps/standalone-java`

```bash
cd apps/standalone-java
gradle run
```

Optional:
```bash
export PLAGX_API_BASE_URL=http://localhost:3000
```

## 4) Android client (Kotlin + Retrofit)
Location: `apps/mobile-android`

- Open folder in Android Studio
- Sync Gradle
- Build and Run app module

API base URL defaults to emulator loopback:
- `http://10.0.2.2:3000`

## 5) Required backend endpoints used by clients
- `POST /api/auth/login`
- `GET /api/clients`
- `POST /api/clients`
- `GET /api/services`
- `POST /api/appointments`

All operational endpoints use `Authorization: Bearer <token>`.
