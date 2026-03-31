package com.plagxsolutions.standalone;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ClienteDAO {

    // CREATE operation.
    public boolean createCliente(Cliente cliente) {
        String sql = "INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, cliente.getNombre());
            preparedStatement.setString(2, cliente.getDireccion());
            preparedStatement.setString(3, cliente.getTelefono());
            preparedStatement.setString(4, cliente.getEmail());
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.out.println("Error createCliente: " + exception.getMessage());
            return false;
        }
    }

    // READ operation.
    public List<Cliente> getClientes() {
        String sql = "SELECT id_cliente, nombre, direccion, telefono, email FROM clientes";
        List<Cliente> clientes = new ArrayList<>();

        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                clientes.add(new Cliente(
                        resultSet.getInt("id_cliente"),
                        resultSet.getString("nombre"),
                        resultSet.getString("direccion"),
                        resultSet.getString("telefono"),
                        resultSet.getString("email")
                ));
            }
        } catch (SQLException exception) {
            System.out.println("Error getClientes: " + exception.getMessage());
        }

        return clientes;
    }

    // UPDATE operation.
    public boolean updateCliente(Cliente cliente) {
        String sql = "UPDATE clientes SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id_cliente = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, cliente.getNombre());
            preparedStatement.setString(2, cliente.getDireccion());
            preparedStatement.setString(3, cliente.getTelefono());
            preparedStatement.setString(4, cliente.getEmail());
            preparedStatement.setInt(5, cliente.getIdCliente());
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.out.println("Error updateCliente: " + exception.getMessage());
            return false;
        }
    }

    // DELETE operation.
    public boolean deleteCliente(int idCliente) {
        String sql = "DELETE FROM clientes WHERE id_cliente = ?";
        try (Connection connection = DatabaseConnection.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, idCliente);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.out.println("Error deleteCliente: " + exception.getMessage());
            return false;
        }
    }
}
