# PLAGXSOLUTIONS

SaaS para la gestión de control de plagas (clientes, técnicos, insumos químicos y reportes de fumigación).

## 1. Requisitos previos
- Node.js 20+
- npm 10+
- Git
- XAMPP con MySQL activo en **puerto 3306**

## 2. Clonar el proyecto
```bash
git clone <URL_DEL_REPOSITORIO>
cd PLAGXSOLUTIONS
```

## 3. Configurar variables de entorno (backend)
Crear `backend/.env`:
```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=plagx
JWT_SECRET=super_secret_plagx_change_me
JWT_EXPIRES_IN=1d
```

> Si usas XAMPP por defecto, el usuario suele ser `root` sin contraseña local.

## 4. Instalar dependencias
```bash
cd backend
npm install
cd ../frontend
npm install
```

## 5. Ejecutar el sistema
### Backend (NestJS)
```bash
cd backend
npm run start:dev
```
Backend disponible en `http://localhost:3000`.

### Frontend
```bash
cd frontend
npm run dev
```
Frontend disponible en el puerto que indique Vite (normalmente `http://localhost:5173`).

## 6. Flujo mínimo de validación
1. Registrar usuario técnico: `POST /auth/register`
2. Iniciar sesión: `POST /auth/login`
3. Copiar `accessToken`
4. Crear reporte: `POST /reports` con `Authorization: Bearer <token>`
5. Verificar que el reporte guarde `autor.userId`, `autor.email` y `autor.role`

## 7. Comandos útiles
```bash
# Backend
npm run build
npm run start:dev

# Frontend
npm run dev
npm run build
```

## 8. Evidencia académica asociada
Ver carpeta `docs/`:
- Documento técnico
- Estrategia de Conventional Commits
- Acta de pruebas y aceptación
