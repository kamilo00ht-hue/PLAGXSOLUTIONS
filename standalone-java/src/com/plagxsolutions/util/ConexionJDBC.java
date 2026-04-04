package com.plagxsolutions.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Clase utilitaria para administrar la conexión JDBC con MySQL.
 */
public final class ConexionJDBC {
    private static final String URL = "jdbc:mysql://localhost:3306/plagxsolutions";
    private static final String USUARIO = "root";
    private static final String CLAVE = "";

    private ConexionJDBC() {
        // Constructor privado para evitar instanciación.
    }

    /**
     * Obtiene una conexión JDBC activa con la base de datos.
     *
     * @return conexión activa
     * @throws SQLException excepción de conexión con mensaje claro
     */
    public static Connection getConnection() throws SQLException {
        try {
            return DriverManager.getConnection(URL, USUARIO, CLAVE);
        } catch (SQLException exception) {
            throw new SQLException("No fue posible conectar a MySQL (plagxsolutions). Verifique servicio, usuario y clave.", exception);
        }
    }
}

// =====================================================
// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
// Módulo Stand-alone Java + JDBC + Swing
// =====================================================
