package com.plagx.mobile.ui

import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.plagx.mobile.R
import com.plagx.mobile.repository.ClientsRepository
import kotlinx.coroutines.launch

class ClientsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_clients)

        val token = getSharedPreferences("plagx", MODE_PRIVATE).getString("token", "") ?: ""
        val output = findViewById<TextView>(R.id.clientsOutput)

        lifecycleScope.launch {
            try {
                val clients = ClientsRepository().getClients(token)
                output.text = clients.joinToString("\n") { "${it.name} - ${it.email}" }
            } catch (e: Exception) {
                Toast.makeText(this@ClientsActivity, e.message, Toast.LENGTH_LONG).show()
            }
        }
    }
}
