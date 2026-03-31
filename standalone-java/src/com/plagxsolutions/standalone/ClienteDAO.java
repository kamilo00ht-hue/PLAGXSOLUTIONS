package com.plagxsolutions.standalone;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ClienteDAO {

    public boolean crearCliente(Cliente cliente) {
        String sql = "INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)";
        try (Connection connection = ConexionDB.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, cliente.getNombre());
            preparedStatement.setString(2, cliente.getDireccion());
            preparedStatement.setString(3, cliente.getTelefono());
            preparedStatement.setString(4, cliente.getEmail());
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.out.println("Error al crear cliente: " + exception.getMessage());
            return false;
        }
    }

    public List<Cliente> consultarClientes() {
        List<Cliente> clientes = new ArrayList<>();
        String sql = "SELECT id_cliente, nombre, direccion, telefono, email FROM clientes";
        try (Connection connection = ConexionDB.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                Cliente cliente = new Cliente(
                        resultSet.getInt("id_cliente"),
                        resultSet.getString("nombre"),
                        resultSet.getString("direccion"),
                        resultSet.getString("telefono"),
                        resultSet.getString("email")
                );
                clientes.add(cliente);
            }
        } catch (SQLException exception) {
            System.out.println("Error al consultar clientes: " + exception.getMessage());
        }
        return clientes;
    }

    public boolean actualizarCliente(Cliente cliente) {
        String sql = "UPDATE clientes SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id_cliente = ?";
        try (Connection connection = ConexionDB.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setString(1, cliente.getNombre());
            preparedStatement.setString(2, cliente.getDireccion());
            preparedStatement.setString(3, cliente.getTelefono());
            preparedStatement.setString(4, cliente.getEmail());
            preparedStatement.setInt(5, cliente.getIdCliente());
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.out.println("Error al actualizar cliente: " + exception.getMessage());
            return false;
        }
    }

    public boolean eliminarCliente(int idCliente) {
        String sql = "DELETE FROM clientes WHERE id_cliente = ?";
        try (Connection connection = ConexionDB.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
            preparedStatement.setInt(1, idCliente);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException exception) {
            System.out.println("Error al eliminar cliente: " + exception.getMessage());
            return false;
        }
    }
}
