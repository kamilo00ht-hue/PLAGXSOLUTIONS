<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head><title>PlagX - Confirmación</title></head>
<body>
    <h2>Servicio de Control de Plagas Registrado</h2>
    <p>Cliente: <%= request.getAttribute("nombreCliente") %></p>
    <p>Tipo de Plaga: <%= request.getAttribute("tipoPlaga") %></p>
    <p>Total de solicitudes registradas en memoria: <%= request.getAttribute("totalRegistros") %></p>
    <hr>
    <p>Evidencia para el programa Tecnólogo en Análisis y Desarrollo de Software.</p>
</body>
</html>
