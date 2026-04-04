package com.plagxsolutions.dao;

import com.plagxsolutions.model.Cliente;
import com.plagxsolutions.util.ConexionJDBC;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Capa de acceso a datos para la entidad Cliente.
 */
public class ClienteDAO {

    /**
     * Inserta un cliente en la base de datos.
     *
     * @param cliente cliente a insertar
     * @return true cuando la operación es exitosa
     */
    public boolean create(Cliente cliente) {
        String sql = """
                INSERT INTO clientes (nombre, apellido, telefono, direccion, email, fecha_registro)
                VALUES (?, ?, ?, ?, ?, ?)
                """;

        try (Connection connection = ConexionJDBC.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, cliente.getNombre());
            preparedStatement.setString(2, cliente.getApellido());
            preparedStatement.setString(3, cliente.getTelefono());
            preparedStatement.setString(4, cliente.getDireccion());
            preparedStatement.setString(5, cliente.getEmail());
            preparedStatement.setTimestamp(6, Timestamp.valueOf(cliente.getFechaRegistro()));
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.err.println("Error SQL en create(): " + exception.getMessage());
            return false;
        }
    }

    /**
     * Consulta todos los clientes registrados.
     *
     * @return lista de clientes
     */
    public List<Cliente> readAll() {
        String sql = "SELECT id, nombre, apellido, telefono, direccion, email, fecha_registro FROM clientes ORDER BY id DESC";
        List<Cliente> clientes = new ArrayList<>();

        try (Connection connection = ConexionJDBC.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Cliente cliente = new Cliente(
                        resultSet.getInt("id"),
                        resultSet.getString("nombre"),
                        resultSet.getString("apellido"),
                        resultSet.getString("telefono"),
                        resultSet.getString("direccion"),
                        resultSet.getString("email"),
                        toLocalDateTime(resultSet.getTimestamp("fecha_registro"))
                );
                clientes.add(cliente);
            }
        } catch (SQLException exception) {
            System.err.println("Error SQL en readAll(): " + exception.getMessage());
        }
        return clientes;
    }

    /**
     * Actualiza datos de un cliente existente.
     *
     * @param cliente cliente con nuevos datos
     * @return true cuando se actualiza correctamente
     */
    public boolean update(Cliente cliente) {
        String sql = """
                UPDATE clientes
                SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, email = ?
                WHERE id = ?
                """;

        try (Connection connection = ConexionJDBC.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, cliente.getNombre());
            preparedStatement.setString(2, cliente.getApellido());
            preparedStatement.setString(3, cliente.getTelefono());
            preparedStatement.setString(4, cliente.getDireccion());
            preparedStatement.setString(5, cliente.getEmail());
            preparedStatement.setInt(6, cliente.getId());
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.err.println("Error SQL en update(): " + exception.getMessage());
            return false;
        }
    }

    /**
     * Elimina un cliente por su identificador.
     *
     * @param id id del cliente
     * @return true cuando se elimina correctamente
     */
    public boolean delete(int id) {
        String sql = "DELETE FROM clientes WHERE id = ?";

        try (Connection connection = ConexionJDBC.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, id);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.err.println("Error SQL en delete(): " + exception.getMessage());
            return false;
        }
    }

    /**
     * Convierte un Timestamp de SQL a LocalDateTime.
     *
     * @param timestamp valor SQL
     * @return fecha convertida
     */
    public LocalDateTime toLocalDateTime(Timestamp timestamp) {
        return timestamp != null ? timestamp.toLocalDateTime() : LocalDateTime.now();
    }
}

// =====================================================
// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
// Módulo Stand-alone Java + JDBC + Swing
// =====================================================
