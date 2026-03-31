<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="com.plagxsolutions.web.model.Cliente" %>
<%
    Cliente cliente = (Cliente) request.getAttribute("cliente");
    boolean editando = cliente != null;
%>
<html>
<head><title><%= editando ? "Editar" : "Crear" %> cliente</title></head>
<body>
<h1><%= editando ? "Editar" : "Crear" %> cliente</h1>
<form action="clientes" method="post">
    <input type="hidden" name="accion" value="<%= editando ? "actualizar" : "crear" %>" />
    <% if (editando) { %>
    <input type="hidden" name="idCliente" value="<%= cliente.getIdCliente() %>" />
    <% } %>

    <label>Nombre:</label><input type="text" name="nombre" value="<%= editando ? cliente.getNombre() : "" %>" required /><br/>
    <label>Dirección:</label><input type="text" name="direccion" value="<%= editando ? cliente.getDireccion() : "" %>" required /><br/>
    <label>Teléfono:</label><input type="text" name="telefono" value="<%= editando ? cliente.getTelefono() : "" %>" required /><br/>
    <label>Email:</label><input type="email" name="email" value="<%= editando ? cliente.getEmail() : "" %>" required /><br/>

    <button type="submit">Guardar</button>
</form>
<a href="clientes">Volver</a>
</body>
</html>
