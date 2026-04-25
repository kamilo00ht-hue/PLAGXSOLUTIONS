# Formato de Acta de Pruebas y Aceptación — Integración de módulos

## Datos generales
- Proyecto: **PLAGXSOLUTIONS**
- Evidencia: **GA8-220501096-AA1-EV02**
- Fecha:
- Responsable QA:
- Ambiente: Desarrollo local (NestJS + MySQL/XAMPP)

## Tabla de pruebas de integración

| ID | Módulo | Caso de prueba | Precondición | Entrada | Resultado esperado | Resultado obtenido | Estado (OK/FAIL) | Evidencia |
|---|---|---|---|---|---|---|---|---|
| INT-001 | Auth + Reports | Creación de reporte con token válido | Usuario técnico autenticado | `POST /reports` con Bearer token y body válido | **201 Created** y `autor.userId` igual al usuario del token |  |  |  |
| INT-002 | Auth + Reports | Rechazo de creación sin token | Endpoint protegido por guard | `POST /reports` sin `Authorization` | **401 Unauthorized** |  |  |  |
| INT-003 | Auth + Reports | Rechazo de token inválido | JWT malformado | `POST /reports` con token inválido | **401 Unauthorized** |  |  |  |
| INT-004 | Reports | Listado de reportes creados | Existe al menos 1 reporte | `GET /reports` | **200 OK** con arreglo de reportes |  |  |  |
| INT-005 | Reports | Consulta de reporte por ID existente | Reporte creado | `GET /reports/:id` | **200 OK** con datos correctos |  |  |  |
| INT-006 | Reports | Consulta de ID inexistente | ID no registrado | `GET /reports/9999` | **404 Not Found** |  |  |  |
| INT-007 | Reports | Actualización de estado de reporte | Reporte existente | `PUT /reports/:id` con `estado=completado` | **200 OK** y estado actualizado |  |  |  |
| INT-008 | Reports | Eliminación de reporte | Reporte existente | `DELETE /reports/:id` | **200 OK** y mensaje de eliminación |  |  |  |

## Criterios de aceptación
- Todos los casos críticos (`INT-001`, `INT-002`, `INT-003`) deben quedar en **OK**.
- No debe ser posible alterar la autoría del reporte desde el body del cliente.
- La trazabilidad de técnico/autenticación debe mantenerse en cada reporte.

## Firmas
- Elaboró:
- Revisó:
- Aprobó:
