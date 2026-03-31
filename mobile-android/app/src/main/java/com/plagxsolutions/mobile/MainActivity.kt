package com.plagxsolutions.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    private lateinit var repository: ClienteRepository
    private lateinit var listView: ListView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        repository = ClienteRepository(this)
        listView = findViewById(R.id.listClientes)

        findViewById<Button>(R.id.btnNuevo).setOnClickListener {
            startActivity(Intent(this, ClienteFormActivity::class.java))
        }
    }

    override fun onResume() {
        super.onResume()
        cargarClientes()
    }

    private fun cargarClientes() {
        val clientes = repository.listar()
        val data = clientes.map { "${it.idCliente} - ${it.nombre} (${it.telefono})" }
        listView.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, data)
    }
}
