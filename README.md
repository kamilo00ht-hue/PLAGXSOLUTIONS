    PLAGXSOLUTIONS | Workspace - Backend Core
Bienvenido al repositorio de desarrollo de PlagXsolutions, un SaaS diseñado para la gestión integral de servicios de control de plagas. Este espacio contiene la lógica de negocio, la arquitectura de datos y el sistema de seguridad que soporta toda la operación técnica.

Estado del Proyecto: Backend Funcional (Fase de Pruebas de Integración finalizada con éxito).

🏗️ Arquitectura Técnica
El sistema está construido bajo una arquitectura modular en NestJS, garantizando escalabilidad y bajo acoplamiento entre sus componentes.

1. Módulos Implementados
Auth Module: Gestión de identidad mediante Passport.js y JWT (JSON Web Tokens). Implementa estrategias de validación para proteger las rutas privadas.

Users Module: Control de perfiles (Técnicos/Administradores) con hashing de contraseñas mediante Bcrypt.

Clients Module: Gestión de terceros con validación de unicidad en base de datos.

Reports Module: El núcleo del sistema. Permite la creación de actas técnicas vinculadas relacionalmente a un cliente mediante clientId (Relación One-to-Many).

2. Stack Tecnológico
Lenguaje: TypeScript (Tipado fuerte para evitar errores en runtime).

Framework: NestJS.

ORM: TypeORM con patrón Data Mapper.

Base de Datos: MySQL (Persistencia de datos configurada).

Validación: Uso de Class-Validator y Pipes para saneamiento de JSON entrantes.

🛠️ Guía de Configuración para Desarrolladores
Variables de Entorno
Para que el sistema conecte con la base de datos local y el servicio de autenticación, es obligatorio crear el archivo backend/.env con esta estructura:

Fragmento de código
# Database Configuration
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=      # Dejar vacío si usas XAMPP por defecto
DB_NAME=plagx

# Security
JWT_SECRET=PLAGX_SECRET_KEY_2026
JWT_EXPIRES_IN=1d
Instalación y Ejecución
Bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor en modo observación
npm run start:dev
🧪 Protocolo de Pruebas (Postman / Insomnia)
Para validar el flujo completo en esta rama, se deben seguir estos pasos técnicos:

Sincronización de Esquema: Al iniciar el servidor, TypeORM generará las tablas user, client y report.

Generación de Credenciales: Realizar un POST a /auth/register seguido de /auth/login.

Inyección de Token: El accessToken recibido debe colocarse en el Header como Authorization: Bearer <TOKEN>.

Validación de Relaciones: Al crear un reporte (POST /reports), el sistema verificará que el clientId proporcionado exista en la tabla de clientes antes de persistir la información.

📊 Evidencia Académica y Calidad
Este repositorio cumple con los estándares de formación del SENA:

GitFlow: Uso de ramas para control de versiones.

Conventional Commits: Historial de cambios estandarizado (feat, fix, docs, chore).

Persistencia: Configuración de synchronize: false sugerida para entornos que no sean de desarrollo inicial para proteger la integridad de los datos.

✉️ Soporte Técnico
Para dudas sobre la arquitectura o reporte de bugs en esta rama:
Correo: kamiloht00@gmail.com
