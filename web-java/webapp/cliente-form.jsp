<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.plagxsolutions.web.ClienteDAO" %>
<%
  ClienteDAO.Cliente cliente = (ClienteDAO.Cliente) request.getAttribute("cliente");
  boolean isEdit = cliente != null;
%>
<html>
<head><title><%= isEdit ? "Editar" : "Crear" %> cliente</title></head>
<body>
<h2><%= isEdit ? "Editar" : "Crear" %> cliente</h2>
<form action="<%= isEdit ? "editar" : "crear" %>" method="post">
  <% if (isEdit) { %>
  <input type="hidden" name="idCliente" value="<%= cliente.getIdCliente() %>" />
  <% } %>
  <label>Nombre</label><input name="nombre" value="<%= isEdit ? cliente.getNombre() : "" %>" required /><br/>
  <label>Dirección</label><input name="direccion" value="<%= isEdit ? cliente.getDireccion() : "" %>" required /><br/>
  <label>Teléfono</label><input name="telefono" value="<%= isEdit ? cliente.getTelefono() : "" %>" required /><br/>
  <label>Email</label><input name="email" value="<%= isEdit ? cliente.getEmail() : "" %>" required /><br/>
  <button type="submit">Guardar</button>
</form>
<a href="../clientes">Volver</a>
</body>
</html>
