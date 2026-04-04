# PLAGXSOLUTIONS - Módulo Stand-alone (Java + JDBC + Swing)

## Descripción del módulo
Este módulo implementa la gestión de clientes para PLAGXSOLUTIONS mediante una aplicación de escritorio en Java 17.
Cumple la evidencia del SENA **GA7-220501096-AA2-EV01** demostrando conexión JDBC, CRUD completo, interfaz Swing y buenas prácticas de codificación.

## Estructura
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

## Cómo compilar y ejecutar
1. Tener Java 17+ instalado.
2. Tener MySQL activo y base de datos `plagxsolutions`.
3. Crear tabla `clientes` con columnas:
   - `id`, `nombre`, `apellido`, `telefono`, `direccion`, `email`, `fecha_registro`.
4. Ajustar credenciales en `ConexionJDBC.java` si aplica.
5. Compilar y ejecutar:

```bash
cd standalone-java/src
javac com/plagxsolutions/model/Cliente.java \
      com/plagxsolutions/util/ConexionJDBC.java \
      com/plagxsolutions/dao/ClienteDAO.java \
      com/plagxsolutions/gui/VentanaPrincipal.java
java com.plagxsolutions.gui.VentanaPrincipal
```

## Estándar de codificación utilizado
- Clases: PascalCase
- Métodos y variables: camelCase
- Constantes: UPPER_SNAKE_CASE
- Javadoc en clases y métodos públicos
- Indentación de 4 espacios
- Nombres claros en español

## Relación con la evidencia SENA
Este módulo aporta directamente a los criterios de evaluación:
- **JDBC (30%)**: uso de DriverManager, Connection, PreparedStatement y ResultSet.
- **CRUD completo (30%)**: crear, leer, actualizar y eliminar clientes.
- **Estándar de codificación (10%)**: convención y documentación formal.
- **Calidad profesional**: separación por capas (model, dao, util, gui) y código mantenible.

// =====================================================
// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
// Módulo Stand-alone Java + JDBC + Swing
// =====================================================
