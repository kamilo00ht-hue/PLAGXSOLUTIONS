package com.plagxsolutions.web.controller;

import com.plagxsolutions.web.dao.ClienteDAO;
import com.plagxsolutions.web.model.Cliente;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/clientes")
public class ClienteServlet extends HttpServlet {
    private final ClienteDAO clienteDAO = new ClienteDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String accion = request.getParameter("accion");

        if ("editar".equals(accion)) {
            int idCliente = Integer.parseInt(request.getParameter("id"));
            request.setAttribute("cliente", clienteDAO.obtenerPorId(idCliente));
            request.getRequestDispatcher("/WEB-INF/views/cliente-form.jsp").forward(request, response);
            return;
        }

        if ("nuevo".equals(accion)) {
            request.getRequestDispatcher("/WEB-INF/views/cliente-form.jsp").forward(request, response);
            return;
        }

        request.setAttribute("clientes", clienteDAO.listar());
        request.getRequestDispatcher("/WEB-INF/views/clientes-list.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String accion = request.getParameter("accion");
        try {
            if ("crear".equals(accion)) {
                Cliente cliente = construirClienteDesdeRequest(request);
                clienteDAO.crear(cliente);
            } else if ("actualizar".equals(accion)) {
                Cliente cliente = construirClienteDesdeRequest(request);
                cliente.setIdCliente(Integer.parseInt(request.getParameter("idCliente")));
                clienteDAO.actualizar(cliente);
            } else if ("eliminar".equals(accion)) {
                int idCliente = Integer.parseInt(request.getParameter("idCliente"));
                clienteDAO.eliminar(idCliente);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        response.sendRedirect("clientes");
    }

    private Cliente construirClienteDesdeRequest(HttpServletRequest request) {
        Cliente cliente = new Cliente();
        cliente.setNombre(request.getParameter("nombre"));
        cliente.setDireccion(request.getParameter("direccion"));
        cliente.setTelefono(request.getParameter("telefono"));
        cliente.setEmail(request.getParameter("email"));
        return cliente;
    }
}
