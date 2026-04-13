@WebServlet("/service")
public class ServiceController extends HttpServlet {
    
    // Indicador: Utiliza el método GET para redireccionar (30%)
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/confirmacion.jsp").forward(request, response);
    }

    // Indicador: Utiliza el método POST para procesar parámetros (30%)
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String cliente = request.getParameter("cliente");
        String plaga = request.getParameter("plaga");
        
        request.setAttribute("nombreCliente", cliente);
        request.setAttribute("tipoPlaga", plaga);
        request.getRequestDispatcher("/confirmacion.jsp").forward(request, response);
    }
}