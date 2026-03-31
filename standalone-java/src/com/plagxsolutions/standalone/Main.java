package com.plagxsolutions.standalone;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ClienteDAO clienteDAO = new ClienteDAO();
        int opcion;

        do {
            System.out.println("\n=== PLAGXSOLUTIONS - Stand-alone ===");
            System.out.println("1 Crear cliente");
            System.out.println("2 Listar clientes");
            System.out.println("3 Actualizar cliente");
            System.out.println("4 Eliminar cliente");
            System.out.println("5 Salir");
            System.out.print("Seleccione: ");
            opcion = Integer.parseInt(scanner.nextLine());

            switch (opcion) {
                case 1 -> crearCliente(scanner, clienteDAO);
                case 2 -> listarClientes(clienteDAO);
                case 3 -> actualizarCliente(scanner, clienteDAO);
                case 4 -> eliminarCliente(scanner, clienteDAO);
                case 5 -> System.out.println("Fin del programa.");
                default -> System.out.println("Opción no válida.");
            }
        } while (opcion != 5);

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

        System.out.println(clienteDAO.createCliente(cliente) ? "Cliente creado" : "Error al crear");
    }

    private static void listarClientes(ClienteDAO clienteDAO) {
        List<Cliente> clientes = clienteDAO.getClientes();
        if (clientes.isEmpty()) {
            System.out.println("No hay registros.");
            return;
        }
        for (Cliente cliente : clientes) {
            System.out.printf("%d | %s | %s | %s | %s%n", cliente.getIdCliente(), cliente.getNombre(),
                    cliente.getDireccion(), cliente.getTelefono(), cliente.getEmail());
        }
    }

    private static void actualizarCliente(Scanner scanner, ClienteDAO clienteDAO) {
        Cliente cliente = new Cliente();
        System.out.print("ID a actualizar: ");
        cliente.setIdCliente(Integer.parseInt(scanner.nextLine()));
        System.out.print("Nuevo nombre: ");
        cliente.setNombre(scanner.nextLine());
        System.out.print("Nueva dirección: ");
        cliente.setDireccion(scanner.nextLine());
        System.out.print("Nuevo teléfono: ");
        cliente.setTelefono(scanner.nextLine());
        System.out.print("Nuevo email: ");
        cliente.setEmail(scanner.nextLine());

        System.out.println(clienteDAO.updateCliente(cliente) ? "Cliente actualizado" : "Error al actualizar");
    }

    private static void eliminarCliente(Scanner scanner, ClienteDAO clienteDAO) {
        System.out.print("ID a eliminar: ");
        int idCliente = Integer.parseInt(scanner.nextLine());
        System.out.println(clienteDAO.deleteCliente(idCliente) ? "Cliente eliminado" : "Error al eliminar");
    }
}
