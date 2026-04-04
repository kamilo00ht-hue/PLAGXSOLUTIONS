package com.plagxsolutions.model;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entidad de dominio para representar un cliente de PLAGXSOLUTIONS.
 */
public class Cliente {
    private int id;
    private String nombre;
    private String apellido;
    private String telefono;
    private String direccion;
    private String email;
    private LocalDateTime fechaRegistro;

    /**
     * Constructor vacío para frameworks o inicialización manual.
     */
    public Cliente() {
    }

    /**
     * Constructor completo para operaciones CRUD.
     *
     * @param id identificador del cliente
     * @param nombre nombre del cliente
     * @param apellido apellido del cliente
     * @param telefono teléfono del cliente
     * @param direccion dirección del cliente
     * @param email correo electrónico del cliente
     * @param fechaRegistro fecha y hora de registro
     */
    public Cliente(int id, String nombre, String apellido, String telefono, String direccion, String email,
                   LocalDateTime fechaRegistro) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email;
        this.fechaRegistro = fechaRegistro;
    }

    /**
     * @return id del cliente
     */
    public int getId() {
        return id;
    }

    /**
     * @param id nuevo id del cliente
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return nombre del cliente
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre nuevo nombre del cliente
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return apellido del cliente
     */
    public String getApellido() {
        return apellido;
    }

    /**
     * @param apellido nuevo apellido del cliente
     */
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    /**
     * @return teléfono del cliente
     */
    public String getTelefono() {
        return telefono;
    }

    /**
     * @param telefono nuevo teléfono del cliente
     */
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    /**
     * @return dirección del cliente
     */
    public String getDireccion() {
        return direccion;
    }

    /**
     * @param direccion nueva dirección del cliente
     */
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    /**
     * @return correo electrónico del cliente
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email nuevo correo electrónico
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return fecha de registro del cliente
     */
    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    /**
     * @param fechaRegistro nueva fecha de registro
     */
    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    /**
     * Representación legible para depuración y logs.
     *
     * @return texto del cliente
     */
    @Override
    public String toString() {
        return "Cliente{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", telefono='" + telefono + '\'' +
                ", direccion='" + direccion + '\'' +
                ", email='" + email + '\'' +
                ", fechaRegistro=" + fechaRegistro +
                '}';
    }

    /**
     * Compara clientes por sus atributos principales.
     *
     * @param obj objeto a comparar
     * @return true si son equivalentes
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Cliente other)) return false;
        return id == other.id
                && Objects.equals(nombre, other.nombre)
                && Objects.equals(apellido, other.apellido)
                && Objects.equals(telefono, other.telefono)
                && Objects.equals(direccion, other.direccion)
                && Objects.equals(email, other.email)
                && Objects.equals(fechaRegistro, other.fechaRegistro);
    }

    /**
     * Calcula hash de la entidad para colecciones hash.
     *
     * @return hash del cliente
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, apellido, telefono, direccion, email, fechaRegistro);
    }
}

// =====================================================
// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
// Módulo Stand-alone Java + JDBC + Swing
// =====================================================
