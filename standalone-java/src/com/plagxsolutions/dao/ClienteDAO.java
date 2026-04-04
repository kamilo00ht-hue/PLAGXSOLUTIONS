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
 * Capa de acceso a datos para operaciones CRUD de la entidad Cliente.
 */
public class ClienteDAO {

    /**
     * Crea un cliente en la base de datos.
     *
     * @param cliente datos del cliente a insertar
     * @return true si se insertó correctamente
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
            System.err.println("Error al crear cliente: " + exception.getMessage());
            return false;
        }
    }

    /**
     * Obtiene todos los clientes de la base de datos.
     *
     * @return lista de clientes registrados
     */
    public List<Cliente> readAll() {
        String sql = "SELECT id, nombre, apellido, telefono, direccion, email, fecha_registro FROM clientes";
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
            System.err.println("Error al consultar clientes: " + exception.getMessage());
        }

        return clientes;
    }

    /**
     * Actualiza un cliente existente en la base de datos.
     *
     * @param cliente cliente con datos nuevos
     * @return true si se actualizó correctamente
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
            System.err.println("Error al actualizar cliente: " + exception.getMessage());
            return false;
        }
    }

    /**
     * Elimina un cliente por su identificador.
     *
     * @param id identificador del cliente
     * @return true si se eliminó correctamente
     */
    public boolean delete(int id) {
        String sql = "DELETE FROM clientes WHERE id = ?";

        try (Connection connection = ConexionJDBC.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, id);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.err.println("Error al eliminar cliente: " + exception.getMessage());
            return false;
        }
    }

    /**
     * Convierte un Timestamp SQL a LocalDateTime.
     *
     * @param timestamp valor en SQL
     * @return fecha en formato LocalDateTime
     */
    public LocalDateTime toLocalDateTime(Timestamp timestamp) {
        return timestamp != null ? timestamp.toLocalDateTime() : LocalDateTime.now();
    }
}

// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
