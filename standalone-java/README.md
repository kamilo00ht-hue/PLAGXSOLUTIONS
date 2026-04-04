# Módulo Stand-alone Java - PLAGXSOLUTIONS

## ¿Qué es este módulo?
Este módulo es la versión de escritorio del proyecto PLAGXSOLUTIONS para la evidencia
**GA7-220501096-AA2-EV01** del SENA.

Implementa gestión de clientes con interfaz gráfica (Swing) y conexión real a MySQL por JDBC.

## Estructura del módulo
```text
standalone-java/
├── src/
│   └── com/
│       └── plagxsolutions/
│           ├── model/
│           │   └── Cliente.java
│           ├── dao/
│           │   └── ClienteDAO.java
│           ├── util/
│           │   └── ConexionJDBC.java
│           └── gui/
│               └── VentanaPrincipal.java
├── README.md
└── .gitignore
```

## Cómo ejecutar
1. Asegúrese de tener Java 17+ y MySQL corriendo.
2. Cree la base de datos `plagxsolutions` y la tabla `clientes` con campos:
   `id, nombre, apellido, telefono, direccion, email, fecha_registro`.
3. Ajuste usuario/clave en `ConexionJDBC.java` si es necesario.
4. Compile y ejecute:

```bash
cd standalone-java/src
javac com/plagxsolutions/model/Cliente.java com/plagxsolutions/util/ConexionJDBC.java com/plagxsolutions/dao/ClienteDAO.java com/plagxsolutions/gui/VentanaPrincipal.java
java com.plagxsolutions.gui.VentanaPrincipal
```

## Estándar de codificación utilizado
- Clases en PascalCase.
- Métodos y variables en camelCase.
- Documentación Javadoc en clases y métodos públicos.
- Indentación de 4 espacios.
- Nombres descriptivos en español.

## Relación con evidencia SENA
Este módulo evidencia:
- Uso de JDBC (DriverManager, Connection, PreparedStatement, ResultSet).
- CRUD completo (crear, consultar, actualizar, eliminar).
- Código limpio y mantenible con separación por capas (model, dao, util, gui).

// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
