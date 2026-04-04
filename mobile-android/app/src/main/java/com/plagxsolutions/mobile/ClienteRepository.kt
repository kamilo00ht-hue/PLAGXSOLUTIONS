package com.plagxsolutions.mobile

import android.content.ContentValues
import android.content.Context

class ClienteRepository(context: Context) {
    private val dbHelper = ClienteDbHelper(context)

    fun crear(cliente: Cliente): Long {
        val db = dbHelper.writableDatabase
        val values = ContentValues().apply {
            put("nombre", cliente.nombre)
            put("direccion", cliente.direccion)
            put("telefono", cliente.telefono)
            put("email", cliente.email)
        }
        return db.insert("clientes", null, values)
    }

    fun listar(): List<Cliente> {
        val db = dbHelper.readableDatabase
        val cursor = db.rawQuery("SELECT id_cliente, nombre, direccion, telefono, email FROM clientes", null)
        val clientes = mutableListOf<Cliente>()

        while (cursor.moveToNext()) {
            clientes.add(
                Cliente(
                    idCliente = cursor.getInt(0),
                    nombre = cursor.getString(1),
                    direccion = cursor.getString(2),
                    telefono = cursor.getString(3),
                    email = cursor.getString(4)
                )
            )
        }
        cursor.close()
        return clientes
    }

    fun actualizar(cliente: Cliente): Int {
        val db = dbHelper.writableDatabase
        val values = ContentValues().apply {
            put("nombre", cliente.nombre)
            put("direccion", cliente.direccion)
            put("telefono", cliente.telefono)
            put("email", cliente.email)
        }
        return db.update("clientes", values, "id_cliente = ?", arrayOf(cliente.idCliente.toString()))
    }

    fun eliminar(idCliente: Int): Int {
        val db = dbHelper.writableDatabase
        return db.delete("clientes", "id_cliente = ?", arrayOf(idCliente.toString()))
    }
}
