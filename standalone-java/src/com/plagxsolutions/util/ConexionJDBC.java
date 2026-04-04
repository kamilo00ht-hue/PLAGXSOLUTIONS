package com.plagxsolutions.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase utilitaria para centralizar la conexión JDBC a MySQL.
 *
 * <p>Esta clase permite que el módulo Stand-alone mantenga una sola configuración
 * de conexión para toda la aplicación.</p>
 */
public final class ConexionJDBC {
    private static final String URL = "jdbc:mysql://localhost:3306/plagxsolutions";
    private static final String USUARIO = "root";
    private static final String CLAVE = "";

    private ConexionJDBC() {
        // Evita instanciación de clase utilitaria.
    }

    /**
     * Obtiene una conexión activa hacia MySQL usando DriverManager.
     *
     * @return conexión JDBC lista para usar
     * @throws SQLException cuando falla la conexión con la base de datos
     */
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, CLAVE);
    }
}

// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
