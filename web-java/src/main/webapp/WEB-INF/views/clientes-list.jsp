<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="com.plagxsolutions.web.model.Cliente" %>
<html>
<head><title>Clientes</title></head>
<body>
<h1>Clientes - PLAGXSOLUTIONS</h1>
<a href="clientes?accion=nuevo">Nuevo cliente</a>
<table border="1" cellpadding="8">
    <tr>
        <th>ID</th><th>Nombre</th><th>Dirección</th><th>Teléfono</th><th>Email</th><th>Acciones</th>
    </tr>
    <%
        List<Cliente> clientes = (List<Cliente>) request.getAttribute("clientes");
        if (clientes != null) {
            for (Cliente cliente : clientes) {
    %>
    <tr>
        <td><%= cliente.getIdCliente() %></td>
        <td><%= cliente.getNombre() %></td>
        <td><%= cliente.getDireccion() %></td>
        <td><%= cliente.getTelefono() %></td>
        <td><%= cliente.getEmail() %></td>
        <td>
            <a href="clientes?accion=editar&id=<%= cliente.getIdCliente() %>">Editar</a>
            <form action="clientes" method="post" style="display:inline;">
                <input type="hidden" name="accion" value="eliminar" />
                <input type="hidden" name="idCliente" value="<%= cliente.getIdCliente() %>" />
                <button type="submit">Eliminar</button>
            </form>
        </td>
    </tr>
    <%      }
        }
    %>
</table>
</body>
</html>
