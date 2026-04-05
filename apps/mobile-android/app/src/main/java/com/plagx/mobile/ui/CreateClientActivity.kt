package com.plagx.mobile.ui

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.plagx.mobile.R
import com.plagx.mobile.network.CreateClientRequest
import com.plagx.mobile.repository.ClientsRepository
import kotlinx.coroutines.launch

class CreateClientActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_client)

        val token = getSharedPreferences("plagx", MODE_PRIVATE).getString("token", "") ?: ""
        val name = findViewById<EditText>(R.id.nameInput)
        val email = findViewById<EditText>(R.id.emailInput)
        val phone = findViewById<EditText>(R.id.phoneInput)
        val address = findViewById<EditText>(R.id.addressInput)

        findViewById<Button>(R.id.saveClientButton).setOnClickListener {
            lifecycleScope.launch {
                try {
                    ClientsRepository().createClient(token, CreateClientRequest(name.text.toString(), email.text.toString(), phone.text.toString(), address.text.toString()))
                    Toast.makeText(this@CreateClientActivity, "Client created", Toast.LENGTH_LONG).show()
                    finish()
                } catch (e: Exception) {
                    Toast.makeText(this@CreateClientActivity, e.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}
