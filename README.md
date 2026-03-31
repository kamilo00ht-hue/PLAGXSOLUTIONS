# PLAGXSOLUTIONS - GA7-220501096-AA2-EV01

Proyecto académico para la evidencia **“Codificación de módulos del software según requerimientos del proyecto”** del SENA.

## 1) Descripción del proyecto
PLAGXSOLUTIONS es un sistema para gestión de clientes en una empresa de control de plagas.

Este repositorio incluye tres módulos diferentes (stand-alone, web y móvil) para demostrar capacidades de desarrollo en distintos entornos y el manejo de CRUD completo sobre la tabla `clientes`.

## 2) Tecnologías utilizadas
- **Base de datos:** MySQL.
- **Módulo stand-alone:** Java consola + JDBC.
- **Módulo web:** Java Servlets + JSP + JDBC.
- **Módulo móvil:** Android (Kotlin) + SQLite.
- **Control de versiones:** Git.

## 3) Estructura del proyecto
```text
PLAGXSOLUTIONS/
  README.md
  standalone-java/
  web-java/
  mobile-android/
  database/
```

## 4) Base de datos
Script disponible en `database/schema.sql`.

```sql
CREATE TABLE clientes(
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  direccion VARCHAR(150),
  telefono VARCHAR(20),
  email VARCHAR(100)
);
```

## 5) Módulo stand-alone (Java + JDBC)
Ruta: `standalone-java/src/com/plagxsolutions/standalone/`

Incluye:
- Conexión JDBC con `DriverManager`, `Connection`.
- Operaciones CRUD con `PreparedStatement` y consultas con `ResultSet`.
- Menú por consola para crear, consultar, actualizar y eliminar clientes.

## 6) Módulo web (Servlets + JSP + JDBC)
Ruta: `web-java/`

Incluye:
- Servlet `ClienteServlet` para flujo CRUD.
- DAO JDBC para operaciones de base de datos.
- Vistas JSP:
  - `clientes-list.jsp`
  - `cliente-form.jsp`

## 7) Módulo móvil (Android Kotlin)
Ruta: `mobile-android/`

Incluye:
- `ClienteDbHelper` con SQLite.
- `ClienteRepository` con CRUD.
- `MainActivity` para listar clientes.
- `ClienteFormActivity` para registrar clientes.

## 8) Estándar de codificación aplicado
- **Clases:** PascalCase.
- **Variables y métodos:** camelCase.
- **Comentarios:** se agregan en operaciones importantes para mejorar comprensión académica.
- **Responsabilidad única:** separación por capas (`model`, `dao`, `controller`, `util`).

## 9) Ejemplo de flujo Git solicitado
```bash
git init
git add .
git commit -m "Inicializar proyecto"
git commit -m "Implementar conexión JDBC"
git commit -m "Implementar CRUD clientes"
```

## 10) Observaciones académicas
Los tres módulos no requieren integración entre sí para esta evidencia. El objetivo principal es demostrar:
- Programación funcional.
- Uso de JDBC y CRUD.
- Uso de control de versiones.
- Aplicación de estándar de codificación.
