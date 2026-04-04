package com.plagxsolutions.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(urlPatterns = {"/clientes", "/cliente/crear", "/cliente/editar", "/cliente/eliminar"})
public class ClienteServlet extends HttpServlet {
    private final ClienteDAO clienteDAO = new ClienteDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String servletPath = request.getServletPath();

        if ("/cliente/crear".equals(servletPath)) {
            request.getRequestDispatcher("/webapp/cliente-form.jsp").forward(request, response);
            return;
        }

        if ("/cliente/editar".equals(servletPath)) {
            int idCliente = Integer.parseInt(request.getParameter("id"));
            request.setAttribute("cliente", clienteDAO.getClienteById(idCliente));
            request.getRequestDispatcher("/webapp/cliente-form.jsp").forward(request, response);
            return;
        }

        request.setAttribute("clientes", clienteDAO.getClientes());
        request.getRequestDispatcher("/webapp/clientes.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String servletPath = request.getServletPath();

        try {
            if ("/cliente/crear".equals(servletPath)) {
                ClienteDAO.Cliente cliente = mapFromRequest(request);
                clienteDAO.createCliente(cliente);
            } else if ("/cliente/editar".equals(servletPath)) {
                ClienteDAO.Cliente cliente = mapFromRequest(request);
                cliente.setIdCliente(Integer.parseInt(request.getParameter("idCliente")));
                clienteDAO.updateCliente(cliente);
            } else if ("/cliente/eliminar".equals(servletPath)) {
                int idCliente = Integer.parseInt(request.getParameter("idCliente"));
                clienteDAO.deleteCliente(idCliente);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
        }

        response.sendRedirect(request.getContextPath() + "/clientes");
    }

    private ClienteDAO.Cliente mapFromRequest(HttpServletRequest request) {
        ClienteDAO.Cliente cliente = new ClienteDAO.Cliente();
        cliente.setNombre(request.getParameter("nombre"));
        cliente.setDireccion(request.getParameter("direccion"));
        cliente.setTelefono(request.getParameter("telefono"));
        cliente.setEmail(request.getParameter("email"));
        return cliente;
    }
}
