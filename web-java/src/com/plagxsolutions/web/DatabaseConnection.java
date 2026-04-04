package com.plagxsolutions.web;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/plagxsolutions_db";
    private static final String USER = "root";
    private static final String PASSWORD = "123456";

    // Centralized JDBC connection for web module.
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
