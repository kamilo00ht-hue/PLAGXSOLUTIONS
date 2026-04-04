package com.plagxsolutions.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var repository: ClienteRepository
    private lateinit var listView: ListView
    private var clientes: List<Cliente> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        repository = ClienteRepository(this)
        listView = findViewById(R.id.listClientes)

        findViewById<Button>(R.id.btnNuevo).setOnClickListener {
            startActivity(Intent(this, ClienteFormActivity::class.java))
        }

        // Edit client when tapping an item.
        listView.setOnItemClickListener { _, _, position, _ ->
            val cliente = clientes[position]
            val intent = Intent(this, ClienteFormActivity::class.java)
            intent.putExtra("idCliente", cliente.idCliente)
            intent.putExtra("nombre", cliente.nombre)
            intent.putExtra("direccion", cliente.direccion)
            intent.putExtra("telefono", cliente.telefono)
            intent.putExtra("email", cliente.email)
            startActivity(intent)
        }

        // Delete client with long press.
        listView.setOnItemLongClickListener { _, _, position, _ ->
            val deleted = repository.eliminar(clientes[position].idCliente)
            if (deleted > 0) {
                Toast.makeText(this, "Cliente eliminado", Toast.LENGTH_SHORT).show()
                cargarClientes()
            }
            true
        }
    }

    override fun onResume() {
        super.onResume()
        cargarClientes()
    }

    private fun cargarClientes() {
        clientes = repository.listar()
        val data = clientes.map { "${it.idCliente} - ${it.nombre} (${it.telefono})" }
        listView.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, data)
    }
}
