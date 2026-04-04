package com.plagxsolutions.model;

import java.time.LocalDateTime;

/**
 * Modelo de dominio para representar un cliente en el sistema PLAGXSOLUTIONS.
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
     * Constructor vacío para inicializaciones parciales.
     */
    public Cliente() {
    }

    /**
     * Constructor completo del modelo Cliente.
     *
     * @param id identificador único
     * @param nombre nombre del cliente
     * @param apellido apellido del cliente
     * @param telefono teléfono del cliente
     * @param direccion dirección del cliente
     * @param email correo del cliente
     * @param fechaRegistro fecha de registro
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
     * @param email nuevo correo electrónico del cliente
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return fecha y hora de registro
     */
    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    /**
     * @param fechaRegistro nueva fecha y hora de registro
     */
    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}

// Archivo listo para evidencia SENA - GA7-220501096-AA2-EV01
