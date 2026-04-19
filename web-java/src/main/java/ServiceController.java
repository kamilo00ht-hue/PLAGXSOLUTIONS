import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Controlador principal para el registro de servicios de control de plagas.
 *
 * <p>Su responsabilidad es recibir las solicitudes HTTP, delegar la persistencia
 * en el repositorio y enviar los datos necesarios a la vista de confirmación.</p>
 */
@WebServlet("/service")
public class ServiceController extends HttpServlet {

    /**
     * Repositorio para simular persistencia en memoria.
     *
     * <p>Se declara como atributo para reutilizar la lógica de almacenamiento
     * y mantener el controlador desacoplado de detalles de infraestructura.</p>
     */
    private final ServicioRepository servicioRepository = new ServicioRepository();

    /**
     * Atiende solicitudes GET redirigiendo a la pantalla de confirmación.
     *
     * @param request  objeto de solicitud HTTP
     * @param response objeto de respuesta HTTP
     * @throws ServletException error del contenedor de servlets
     * @throws IOException      error de entrada/salida
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Se conserva la lógica de redirección/forward solicitada por el requerimiento.
        request.getRequestDispatcher("/confirmacion.jsp").forward(request, response);
    }

    /**
     * Atiende solicitudes POST, registra la información del servicio y
     * envía los datos a la vista de confirmación.
     *
     * @param request  objeto de solicitud HTTP con parámetros del formulario
     * @param response objeto de respuesta HTTP
     * @throws ServletException error del contenedor de servlets
     * @throws IOException      error de entrada/salida
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1) Captura de parámetros enviados desde el formulario.
        String cliente = request.getParameter("cliente");
        String plaga = request.getParameter("plaga");

        // 2) Creación de la entidad de dominio para encapsular los datos del servicio.
        Servicio nuevoServicio = new Servicio(cliente, plaga);

        // 3) Persistencia simulada en memoria mediante el patrón Repository/DAO.
        servicioRepository.guardar(nuevoServicio);

        // 4) Preparación de datos para la vista JSP (confirmación al usuario).
        request.setAttribute("nombreCliente", nuevoServicio.getCliente());
        request.setAttribute("tipoPlaga", nuevoServicio.getPlaga());

        // Dato adicional para evidenciar la persistencia funcional en la interfaz.
        request.setAttribute("totalRegistros", servicioRepository.contarRegistros());

        // 5) Navegación: se mantiene intacta la redirección a confirmacion.jsp.
        request.getRequestDispatcher("/confirmacion.jsp").forward(request, response);
    }
}
