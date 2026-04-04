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
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Ventana principal del módulo Stand-alone para gestionar clientes.
 */
public class VentanaPrincipal extends JFrame {
    private static final Color COLOR_FONDO = new Color(0x0A192F);
    private static final Color COLOR_CIAN = new Color(0x00F5FF);
    private static final Color COLOR_VIOLETA = new Color(0x7B2CBF);
    private static final Color COLOR_PANEL = new Color(12, 34, 63);
    private static final Color COLOR_TEXTO = new Color(225, 244, 255);

    private final ClienteDAO clienteDAO;
    private final DefaultTableModel tableModel;

    private final JTextField txtId;
    private final JTextField txtNombre;
    private final JTextField txtApellido;
    private final JTextField txtTelefono;
    private final JTextField txtDireccion;
    private final JTextField txtEmail;

    /**
     * Constructor de la interfaz principal.
     */
    public VentanaPrincipal() {
        this.clienteDAO = new ClienteDAO();

        setTitle("PLAGXSOLUTIONS | Módulo Stand-alone");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setMinimumSize(new Dimension(1100, 700));
        setLocationRelativeTo(null);
        getContentPane().setBackground(COLOR_FONDO);
        setLayout(new BorderLayout(12, 12));

        JPanel panelFormulario = crearPanelFormulario();
        JPanel panelBotones = crearPanelBotones();

        tableModel = new DefaultTableModel(
                new Object[]{"ID", "Nombre", "Apellido", "Teléfono", "Dirección", "Email", "Fecha Registro"}, 0
        ) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };

        JTable tablaClientes = new JTable(tableModel);
        tablaClientes.setRowHeight(24);
        tablaClientes.setBackground(COLOR_PANEL);
        tablaClientes.setForeground(COLOR_TEXTO);
        tablaClientes.setGridColor(COLOR_CIAN);
        tablaClientes.setSelectionBackground(COLOR_VIOLETA);
        tablaClientes.getTableHeader().setBackground(COLOR_VIOLETA);
        tablaClientes.getTableHeader().setForeground(Color.WHITE);
        tablaClientes.getTableHeader().setFont(new Font("Segoe UI", Font.BOLD, 13));

        JScrollPane scrollPane = new JScrollPane(tablaClientes);
        scrollPane.setBorder(BorderFactory.createLineBorder(COLOR_CIAN));

        add(panelFormulario, BorderLayout.NORTH);
        add(panelBotones, BorderLayout.CENTER);
        add(scrollPane, BorderLayout.SOUTH);

        txtId = new JTextField();
        txtNombre = new JTextField();
        txtApellido = new JTextField();
        txtTelefono = new JTextField();
        txtDireccion = new JTextField();
        txtEmail = new JTextField();

        bindFields(panelFormulario);
        listarClientes();

        pack();
    }

    /**
     * Construye el panel del formulario usando GridBag para adaptabilidad.
     *
     * @return panel del formulario
     */
    public JPanel crearPanelFormulario() {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBackground(COLOR_PANEL);
        panel.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(COLOR_CIAN),
                BorderFactory.createEmptyBorder(14, 14, 14, 14)
        ));
        return panel;
    }

    /**
     * Asocia los campos de formulario y sus etiquetas al panel.
     *
     * @param panelFormulario panel donde se insertan los componentes
     */
    public void bindFields(JPanel panelFormulario) {
        GridBagConstraints constraints = new GridBagConstraints();
        constraints.insets = new Insets(8, 8, 8, 8);
        constraints.fill = GridBagConstraints.HORIZONTAL;
        constraints.weightx = 1;

        addField(panelFormulario, constraints, 0, "ID (actualizar/eliminar)", txtId);
        addField(panelFormulario, constraints, 1, "Nombre", txtNombre);
        addField(panelFormulario, constraints, 2, "Apellido", txtApellido);
        addField(panelFormulario, constraints, 3, "Teléfono", txtTelefono);
        addField(panelFormulario, constraints, 4, "Dirección", txtDireccion);
        addField(panelFormulario, constraints, 5, "Email", txtEmail);
    }

    /**
     * Inserta una fila de etiqueta + campo en el formulario.
     *
     * @param panel panel destino
     * @param constraints restricciones de layout
     * @param row fila
     * @param labelText texto de etiqueta
     * @param textField campo de texto
     */
    public void addField(JPanel panel, GridBagConstraints constraints, int row, String labelText, JTextField textField) {
        JLabel label = new JLabel(labelText + ":");
        label.setForeground(COLOR_CIAN);
        label.setFont(new Font("Segoe UI", Font.BOLD, 13));

        textField.setBackground(new Color(18, 49, 82));
        textField.setForeground(COLOR_TEXTO);
        textField.setCaretColor(COLOR_CIAN);
        textField.setBorder(BorderFactory.createLineBorder(COLOR_VIOLETA));

        constraints.gridx = 0;
        constraints.gridy = row;
        constraints.weightx = 0.4;
        panel.add(label, constraints);

        constraints.gridx = 1;
        constraints.weightx = 0.6;
        panel.add(textField, constraints);
    }

    /**
     * Crea panel de botones CRUD + utilitarios.
     *
     * @return panel de acciones
     */
    public JPanel crearPanelBotones() {
        JPanel panel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        panel.setBackground(COLOR_FONDO);

        JButton btnCrear = crearBoton("Crear", COLOR_CIAN);
        JButton btnActualizar = crearBoton("Actualizar", COLOR_VIOLETA);
        JButton btnEliminar = crearBoton("Eliminar", new Color(180, 40, 90));
        JButton btnLimpiar = crearBoton("Limpiar", new Color(45, 114, 180));
        JButton btnActualizarTabla = crearBoton("Actualizar tabla", new Color(22, 152, 140));

        btnCrear.addActionListener(e -> crearCliente());
        btnActualizar.addActionListener(e -> actualizarCliente());
        btnEliminar.addActionListener(e -> eliminarCliente());
        btnLimpiar.addActionListener(e -> limpiarCampos());
        btnActualizarTabla.addActionListener(e -> listarClientes());

        panel.add(btnCrear);
        panel.add(btnActualizar);
        panel.add(btnEliminar);
        panel.add(btnLimpiar);
        panel.add(btnActualizarTabla);
        return panel;
    }

    /**
     * Crea un botón con estilo visual del proyecto.
     *
     * @param texto etiqueta del botón
     * @param color fondo del botón
     * @return botón estilizado
     */
    public JButton crearBoton(String texto, Color color) {
        JButton button = new JButton(texto);
        button.setBackground(color);
        button.setForeground(Color.WHITE);
        button.setFocusPainted(false);
        button.setFont(new Font("Segoe UI", Font.BOLD, 13));
        return button;
    }

    /**
     * Realiza la operación de creación de cliente.
     */
    public void crearCliente() {
        if (!validarFormulario(false)) {
            return;
        }

        Cliente cliente = new Cliente(
                0,
                txtNombre.getText().trim(),
                txtApellido.getText().trim(),
                txtTelefono.getText().trim(),
                txtDireccion.getText().trim(),
                txtEmail.getText().trim(),
                LocalDateTime.now()
        );

        boolean ok = clienteDAO.create(cliente);
        mostrarResultado(ok, "Cliente creado correctamente.", "No fue posible crear el cliente.");
        if (ok) {
            limpiarCampos();
            listarClientes();
        }
    }

    /**
     * Carga los clientes desde la base de datos y refresca la tabla.
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
     * Realiza la actualización de un cliente existente.
     */
    public void actualizarCliente() {
        if (!validarFormulario(true)) {
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

        boolean ok = clienteDAO.update(cliente);
        mostrarResultado(ok, "Cliente actualizado correctamente.", "No fue posible actualizar el cliente.");
        if (ok) {
            limpiarCampos();
            listarClientes();
        }
    }

    /**
     * Elimina el cliente según el ID ingresado.
     */
    public void eliminarCliente() {
        if (txtId.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(this, "Ingrese el ID para eliminar.");
            return;
        }

        int id = Integer.parseInt(txtId.getText().trim());
        boolean ok = clienteDAO.delete(id);
        mostrarResultado(ok, "Cliente eliminado correctamente.", "No fue posible eliminar el cliente.");
        if (ok) {
            limpiarCampos();
            listarClientes();
        }
    }

    /**
     * Limpia el formulario de entrada.
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
     * Valida campos mínimos de formulario.
     *
     * @param requiereId indica si el ID es obligatorio
     * @return true si los datos son válidos
     */
    public boolean validarFormulario(boolean requiereId) {
        if (requiereId && txtId.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(this, "El campo ID es obligatorio para esta operación.");
            return false;
        }
        if (txtNombre.getText().trim().isEmpty() || txtApellido.getText().trim().isEmpty()) {
            JOptionPane.showMessageDialog(this, "Nombre y apellido son obligatorios.");
            return false;
        }
        return true;
    }

    /**
     * Muestra resultado de operación CRUD.
     *
     * @param ok estado
     * @param mensajeOk mensaje éxito
     * @param mensajeError mensaje error
     */
    public void mostrarResultado(boolean ok, String mensajeOk, String mensajeError) {
        JOptionPane.showMessageDialog(this, ok ? mensajeOk : mensajeError);
    }

    /**
     * Punto de inicio para lanzar la interfaz Swing.
     *
     * @param args argumentos de programa
     */
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
            } catch (Exception ignored) {
                // Mantiene look & feel por defecto si no se puede aplicar.
            }
            new VentanaPrincipal().setVisible(true);
        });
    }
}

// =====================================================
// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
// Módulo Stand-alone Java + JDBC + Swing
// =====================================================
