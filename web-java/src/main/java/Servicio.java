/**
 * Representa una solicitud de servicio de control de plagas dentro del sistema PLAGXSOLUTIONS.
 * Esta clase funciona como modelo (entidad simple) y encapsula los datos del cliente
 * y del tipo de plaga reportada.
 */
public class Servicio {

    /** Nombre del cliente que solicita el servicio. */
    private String cliente;

    /** Tipo de plaga reportada por el cliente. */
    private String plaga;

    /**
     * Constructor por defecto requerido para inicialización flexible del objeto.
     */
    public Servicio() {
        // Constructor vacío intencional.
    }

    /**
     * Constructor principal para crear un servicio con todos sus datos.
     *
     * @param cliente nombre del cliente que registra la solicitud
     * @param plaga tipo de plaga asociada al servicio
     */
    public Servicio(String cliente, String plaga) {
        this.cliente = cliente;
        this.plaga = plaga;
    }

    /**
     * Obtiene el nombre del cliente.
     *
     * @return nombre del cliente
     */
    public String getCliente() {
        return cliente;
    }

    /**
     * Actualiza el nombre del cliente.
     *
     * @param cliente nuevo nombre del cliente
     */
    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    /**
     * Obtiene el tipo de plaga reportada.
     *
     * @return tipo de plaga
     */
    public String getPlaga() {
        return plaga;
    }

    /**
     * Actualiza el tipo de plaga reportada.
     *
     * @param plaga nuevo tipo de plaga
     */
    public void setPlaga(String plaga) {
        this.plaga = plaga;
    }
}
