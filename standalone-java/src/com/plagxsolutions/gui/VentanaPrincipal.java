package com.plagxsolutions.gui;

import com.plagxsolutions.dao.ClienteDAO;
import com.plagxsolutions.model.Cliente;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.table.DefaultTableModel;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Ventana principal del módulo Stand-alone para gestión de clientes.
 */
public class VentanaPrincipal extends JFrame {
    private final ClienteDAO clienteDAO;
    private final DefaultTableModel tableModel;

    private final JTextField txtId;
    private final JTextField txtNombre;
    private final JTextField txtApellido;
    private final JTextField txtTelefono;
    private final JTextField txtDireccion;
    private final JTextField txtEmail;

    /**
     * Constructor que inicializa la interfaz gráfica y eventos.
     */
    public VentanaPrincipal() {
        this.clienteDAO = new ClienteDAO();

        setTitle("PLAGXSOLUTIONS - Módulo Stand-alone");
        setSize(1020, 640);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout(12, 12));

        Color fondoPrincipal = new Color(10, 20, 40);
        Color fondoPanel = new Color(16, 35, 60);
        Color colorTexto = new Color(180, 255, 255);
        Color colorBoton = new Color(0, 180, 220);

        getContentPane().setBackground(fondoPrincipal);

        JPanel panelFormulario = new JPanel(new GridLayout(7, 2, 8, 8));
        panelFormulario.setBorder(BorderFactory.createEmptyBorder(14, 14, 14, 14));
        panelFormulario.setBackground(fondoPanel);

        txtId = new JTextField();
        txtNombre = new JTextField();
        txtApellido = new JTextField();
        txtTelefono = new JTextField();
        txtDireccion = new JTextField();
        txtEmail = new JTextField();

        panelFormulario.add(crearLabel("ID (para actualizar/eliminar):", colorTexto));
        panelFormulario.add(txtId);
        panelFormulario.add(crearLabel("Nombre:", colorTexto));
        panelFormulario.add(txtNombre);
        panelFormulario.add(crearLabel("Apellido:", colorTexto));
        panelFormulario.add(txtApellido);
        panelFormulario.add(crearLabel("Teléfono:", colorTexto));
        panelFormulario.add(txtTelefono);
        panelFormulario.add(crearLabel("Dirección:", colorTexto));
        panelFormulario.add(txtDireccion);
        panelFormulario.add(crearLabel("Email:", colorTexto));
        panelFormulario.add(txtEmail);

        JPanel panelBotones = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 6));
        panelBotones.setBackground(fondoPanel);

        JButton btnCrear = crearBoton("Crear", colorBoton);
        JButton btnListar = crearBoton("Listar", colorBoton);
        JButton btnActualizar = crearBoton("Actualizar", colorBoton);
        JButton btnEliminar = crearBoton("Eliminar", colorBoton);

        panelBotones.add(btnCrear);
        panelBotones.add(btnListar);
        panelBotones.add(btnActualizar);
        panelBotones.add(btnEliminar);

        tableModel = new DefaultTableModel(
                new Object[]{"ID", "Nombre", "Apellido", "Teléfono", "Dirección", "Email", "Fecha Registro"}, 0
        );

        JTable tablaClientes = new JTable(tableModel);
        tablaClientes.setBackground(new Color(8, 28, 45));
        tablaClientes.setForeground(colorTexto);
        tablaClientes.setGridColor(new Color(35, 190, 220));
        tablaClientes.getTableHeader().setBackground(new Color(0, 120, 170));
        tablaClientes.getTableHeader().setForeground(Color.WHITE);

        JScrollPane scrollPane = new JScrollPane(tablaClientes);
        scrollPane.setBorder(BorderFactory.createLineBorder(new Color(35, 190, 220)));

        add(panelFormulario, BorderLayout.NORTH);
        add(panelBotones, BorderLayout.CENTER);
        add(scrollPane, BorderLayout.SOUTH);

        // Evento para crear cliente.
        btnCrear.addActionListener(e -> crearCliente());
        // Evento para listar clientes en tabla.
        btnListar.addActionListener(e -> listarClientes());
        // Evento para actualizar cliente por ID.
        btnActualizar.addActionListener(e -> actualizarCliente());
        // Evento para eliminar cliente por ID.
        btnEliminar.addActionListener(e -> eliminarCliente());
    }

    /**
     * Crea una etiqueta con el color visual del módulo.
     *
     * @param texto texto a mostrar
     * @param color color de fuente
     * @return JLabel estilizado
     */
    public JLabel crearLabel(String texto, Color color) {
        JLabel label = new JLabel(texto);
        label.setForeground(color);
        return label;
    }

    /**
     * Crea un botón estilizado.
     *
     * @param texto texto del botón
     * @param color color de fondo
     * @return JButton estilizado
     */
    public JButton crearBoton(String texto, Color color) {
        JButton button = new JButton(texto);
        button.setBackground(color);
        button.setForeground(Color.WHITE);
        return button;
    }

    /**
     * Toma los campos del formulario y crea un cliente en BD.
     */
    public void crearCliente() {
        Cliente cliente = new Cliente(
                0,
                txtNombre.getText().trim(),
                txtApellido.getText().trim(),
                txtTelefono.getText().trim(),
                txtDireccion.getText().trim(),
                txtEmail.getText().trim(),
                LocalDateTime.now()
        );

        boolean creado = clienteDAO.create(cliente);
        mostrarResultado(creado, "Cliente creado correctamente.", "No se pudo crear el cliente.");
        if (creado) {
            limpiarCampos();
            listarClientes();
        }
    }

    /**
     * Consulta todos los clientes y actualiza la tabla.
     */
    public void listarClientes() {
        tableModel.setRowCount(0);
        List<Cliente> clientes = clienteDAO.readAll();
        for (Cliente cliente : clientes) {
            tableModel.addRow(new Object[]{
                    cliente.getId(),
                    cliente.getNombre(),
                    cliente.getApellido(),
                    cliente.getTelefono(),
                    cliente.getDireccion(),
                    cliente.getEmail(),
                    cliente.getFechaRegistro()
            });
        }
    }

    /**
     * Actualiza los datos del cliente indicado por ID.
     */
    public void actualizarCliente() {
        if (txtId.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(this, "Debe ingresar el ID para actualizar.");
            return;
        }

        Cliente cliente = new Cliente(
                Integer.parseInt(txtId.getText().trim()),
                txtNombre.getText().trim(),
                txtApellido.getText().trim(),
                txtTelefono.getText().trim(),
                txtDireccion.getText().trim(),
                txtEmail.getText().trim(),
                LocalDateTime.now()
        );

        boolean actualizado = clienteDAO.update(cliente);
        mostrarResultado(actualizado, "Cliente actualizado correctamente.", "No se pudo actualizar el cliente.");
        if (actualizado) {
            limpiarCampos();
            listarClientes();
        }
    }

    /**
     * Elimina un cliente según el ID digitado.
     */
    public void eliminarCliente() {
        if (txtId.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(this, "Debe ingresar el ID para eliminar.");
            return;
        }

        int id = Integer.parseInt(txtId.getText().trim());
        boolean eliminado = clienteDAO.delete(id);
        mostrarResultado(eliminado, "Cliente eliminado correctamente.", "No se pudo eliminar el cliente.");
        if (eliminado) {
            limpiarCampos();
            listarClientes();
        }
    }

    /**
     * Limpia el formulario después de una operación exitosa.
     */
    public void limpiarCampos() {
        txtId.setText("");
        txtNombre.setText("");
        txtApellido.setText("");
        txtTelefono.setText("");
        txtDireccion.setText("");
        txtEmail.setText("");
    }

    /**
     * Muestra mensajes de éxito o error según el resultado CRUD.
     *
     * @param exito estado de la operación
     * @param mensajeExito mensaje para operación exitosa
     * @param mensajeError mensaje para operación fallida
     */
    public void mostrarResultado(boolean exito, String mensajeExito, String mensajeError) {
        JOptionPane.showMessageDialog(this, exito ? mensajeExito : mensajeError);
    }

    /**
     * Punto de entrada de la interfaz Swing.
     *
     * @param args argumentos de ejecución
     */
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
            } catch (Exception ignored) {
                // Si no aplica look and feel, continúa con el predeterminado.
            }
            new VentanaPrincipal().setVisible(true);
        });
    }
}

// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
