package com.plagxsolutions.standalone;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ClienteDAO clienteDAO = new ClienteDAO();
        int opcion;

        do {
            System.out.println("\n=== PLAGXSOLUTIONS - Módulo Stand-alone ===");
            System.out.println("1. Crear cliente");
            System.out.println("2. Consultar clientes");
            System.out.println("3. Actualizar cliente");
            System.out.println("4. Eliminar cliente");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opción: ");
            opcion = Integer.parseInt(scanner.nextLine());

            switch (opcion) {
                case 1 -> crearCliente(scanner, clienteDAO);
                case 2 -> listarClientes(clienteDAO);
                case 3 -> actualizarCliente(scanner, clienteDAO);
                case 4 -> eliminarCliente(scanner, clienteDAO);
                case 0 -> System.out.println("Saliendo del módulo stand-alone...");
                default -> System.out.println("Opción inválida");
            }
        } while (opcion != 0);

        scanner.close();
    }

    private static void crearCliente(Scanner scanner, ClienteDAO clienteDAO) {
        Cliente cliente = new Cliente();
        System.out.print("Nombre: ");
        cliente.setNombre(scanner.nextLine());
        System.out.print("Dirección: ");
        cliente.setDireccion(scanner.nextLine());
        System.out.print("Teléfono: ");
        cliente.setTelefono(scanner.nextLine());
        System.out.print("Email: ");
        cliente.setEmail(scanner.nextLine());

        System.out.println(clienteDAO.crearCliente(cliente) ? "Cliente creado" : "No se pudo crear");
    }

    private static void listarClientes(ClienteDAO clienteDAO) {
        List<Cliente> clientes = clienteDAO.consultarClientes();
        if (clientes.isEmpty()) {
            System.out.println("No hay clientes registrados");
            return;
        }

        for (Cliente cliente : clientes) {
            System.out.printf("ID: %d | Nombre: %s | Dirección: %s | Teléfono: %s | Email: %s%n",
                    cliente.getIdCliente(), cliente.getNombre(), cliente.getDireccion(), cliente.getTelefono(), cliente.getEmail());
        }
    }

    private static void actualizarCliente(Scanner scanner, ClienteDAO clienteDAO) {
        Cliente cliente = new Cliente();
        System.out.print("ID del cliente a actualizar: ");
        cliente.setIdCliente(Integer.parseInt(scanner.nextLine()));
        System.out.print("Nuevo nombre: ");
        cliente.setNombre(scanner.nextLine());
        System.out.print("Nueva dirección: ");
        cliente.setDireccion(scanner.nextLine());
        System.out.print("Nuevo teléfono: ");
        cliente.setTelefono(scanner.nextLine());
        System.out.print("Nuevo email: ");
        cliente.setEmail(scanner.nextLine());

        System.out.println(clienteDAO.actualizarCliente(cliente) ? "Cliente actualizado" : "No se pudo actualizar");
    }

    private static void eliminarCliente(Scanner scanner, ClienteDAO clienteDAO) {
        System.out.print("ID del cliente a eliminar: ");
        int idCliente = Integer.parseInt(scanner.nextLine());
        System.out.println(clienteDAO.eliminarCliente(idCliente) ? "Cliente eliminado" : "No se pudo eliminar");
    }
}
