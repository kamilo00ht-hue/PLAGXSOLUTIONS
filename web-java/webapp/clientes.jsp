<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="com.plagxsolutions.web.ClienteDAO" %>
<html>
<head><title>Clientes</title></head>
<body>
<h2>Listado de clientes</h2>
<a href="cliente/crear">Crear cliente</a>
<table border="1" cellpadding="6">
  <tr>
    <th>ID</th><th>Nombre</th><th>Dirección</th><th>Teléfono</th><th>Email</th><th>Acciones</th>
  </tr>
<%
  List<ClienteDAO.Cliente> clientes = (List<ClienteDAO.Cliente>) request.getAttribute("clientes");
  if (clientes != null) {
      for (ClienteDAO.Cliente c : clientes) {
%>
  <tr>
    <td><%= c.getIdCliente() %></td>
    <td><%= c.getNombre() %></td>
    <td><%= c.getDireccion() %></td>
    <td><%= c.getTelefono() %></td>
    <td><%= c.getEmail() %></td>
    <td>
      <a href="cliente/editar?id=<%= c.getIdCliente() %>">Editar</a>
      <form action="cliente/eliminar" method="post" style="display:inline;">
        <input type="hidden" name="idCliente" value="<%= c.getIdCliente() %>" />
        <button type="submit">Eliminar</button>
      </form>
    </td>
  </tr>
<%
      }
  }
%>
</table>
<a href="index.jsp">Inicio</a>
</body>
</html>
