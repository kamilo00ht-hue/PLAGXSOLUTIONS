# PLAGXSOLUTIONS - Evidencia SENA GA7-220501096-AA2-EV01

## 1. Descripción del proyecto
PLAGXSOLUTIONS es un prototipo académico para gestión de clientes en una empresa de control de plagas.
Este repositorio fue desarrollado para demostrar la evidencia del SENA:
**"Codificación de módulos del software según requerimientos del proyecto"**.

Se implementan tres módulos con CRUD de `clientes`:
- Stand-alone Java (JDBC + MySQL)
- Web Java (Servlets/JSP + MySQL)
- Móvil Android (Kotlin + SQLite)

## 2. Tecnologías utilizadas
- Java
- JDBC
- MySQL
- Servlets
- JSP
- Android Kotlin
- SQLite
- Git

## 3. Estructura del proyecto
```text
PLAGXSOLUTIONS/
  README.md
  database/
    schema.sql
  standalone-java/
    src/com/plagxsolutions/standalone/
      Main.java
      Cliente.java
      ClienteDAO.java
      DatabaseConnection.java
  web-java/
    src/com/plagxsolutions/web/
      ClienteServlet.java
      DatabaseConnection.java
      ClienteDAO.java
    webapp/
      index.jsp
      clientes.jsp
      cliente-form.jsp
  mobile-android/
    app/src/main/java/com/plagxsolutions/mobile/
      MainActivity.kt
      Cliente.kt
      ClienteDbHelper.kt
      ClienteRepository.kt
      ClienteFormActivity.kt
```

## 4. Estándar de codificación
- Clases: **PascalCase**
- Métodos: **camelCase**
- Variables: **camelCase**
- Constantes: **UPPER_CASE**

Además, se agregan comentarios para explicar:
- conexión a base de datos,
- operaciones CRUD,
- lógica de negocio relevante.

## 5. Ejecución de cada módulo
### Standalone (Java consola)
Ubicación:
`standalone-java/src/com/plagxsolutions/standalone/`

Comandos ejemplo:
```bash
javac *.java
java Main
```

### Web (Servlets + JSP)
1. Configurar Tomcat (o contenedor Jakarta compatible).
2. Copiar el módulo `web-java` al servidor.
3. Desplegar y abrir:
   - `/webapp/index.jsp`
   - `/clientes`

### Móvil (Android)
1. Abrir `mobile-android` en Android Studio.
2. Sincronizar Gradle del proyecto.
3. Ejecutar en emulador o dispositivo.

## 6. Base de datos
Archivo: `database/schema.sql`

```sql
CREATE TABLE clientes(
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(150),
  telefono VARCHAR(20),
  email VARCHAR(100)
);
```

## 7. Flujo de trabajo Git (ejemplo)
```bash
git init
git add .
git commit -m "Initialize project structure"
git commit -m "Implement JDBC connection"
git commit -m "Implement CRUD operations"
git commit -m "Add web module"
git commit -m "Add Android module"
```
