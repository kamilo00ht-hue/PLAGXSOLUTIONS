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
        val idCliente = intent.getIntExtra("idCliente", 0)

        if (idCliente > 0) {
            txtNombre.setText(intent.getStringExtra("nombre"))
            txtDireccion.setText(intent.getStringExtra("direccion"))
            txtTelefono.setText(intent.getStringExtra("telefono"))
            txtEmail.setText(intent.getStringExtra("email"))
        }

        findViewById<Button>(R.id.btnGuardar).setOnClickListener {
            val cliente = Cliente(
                idCliente = idCliente,
                nombre = txtNombre.text.toString(),
                direccion = txtDireccion.text.toString(),
                telefono = txtTelefono.text.toString(),
                email = txtEmail.text.toString()
            )

            // Business rule: if ID exists, update; otherwise create.
            if (idCliente > 0) {
                repository.actualizar(cliente)
            } else {
                repository.crear(cliente)
            }
            finish()
        }
    }
}
