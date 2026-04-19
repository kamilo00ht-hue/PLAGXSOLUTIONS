import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Implementación de repositorio en memoria para simular persistencia de datos.
 *
 * <p>Aplica el patrón DAO/Repository, separando la lógica de almacenamiento
 * del controlador HTTP. Esto permite reemplazar en el futuro esta clase por
 * una implementación con base de datos SQL sin afectar el controlador.</p>
 */
public class ServicioRepository {

    /**
     * Lista estática que simula una tabla de servicios en base de datos.
     *
     * <p>Se usa static para mantener los datos mientras la aplicación esté activa.</p>
     */
    private static final List<Servicio> BASE_DATOS_SIMULADA = new ArrayList<>();

    /**
     * Guarda un servicio en la lista simulada.
     *
     * @param servicio objeto con la información del cliente y plaga
     */
    public void guardar(Servicio servicio) {
        // Bloque de persistencia simulada: agrega la entidad a la "tabla" en memoria.
        BASE_DATOS_SIMULADA.add(servicio);
    }

    /**
     * Lista todos los servicios almacenados en la memoria de la aplicación.
     *
     * @return copia no modificable de los servicios registrados
     */
    public List<Servicio> listarTodos() {
        // Retornamos copia para proteger la estructura interna del repositorio.
        return Collections.unmodifiableList(new ArrayList<>(BASE_DATOS_SIMULADA));
    }

    /**
     * Obtiene la cantidad total de registros almacenados.
     *
     * @return número de servicios registrados
     */
    public int contarRegistros() {
        // Permite mostrar evidencia de persistencia y trazabilidad funcional.
        return BASE_DATOS_SIMULADA.size();
    }
}
