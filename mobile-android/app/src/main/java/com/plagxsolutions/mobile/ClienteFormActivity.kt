package com.plagxsolutions.mobile

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity

class ClienteFormActivity : AppCompatActivity() {
    private lateinit var repository: ClienteRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cliente_form)

        repository = ClienteRepository(this)

        val txtNombre = findViewById<EditText>(R.id.txtNombre)
        val txtDireccion = findViewById<EditText>(R.id.txtDireccion)
        val txtTelefono = findViewById<EditText>(R.id.txtTelefono)
        val txtEmail = findViewById<EditText>(R.id.txtEmail)

        findViewById<Button>(R.id.btnGuardar).setOnClickListener {
            val cliente = Cliente(
                nombre = txtNombre.text.toString(),
                direccion = txtDireccion.text.toString(),
                telefono = txtTelefono.text.toString(),
                email = txtEmail.text.toString()
            )
            repository.crear(cliente)
            finish()
        }
    }
}
