package com.plagx.mobile.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.plagx.mobile.R
import com.plagx.mobile.viewmodel.LoginViewModel

class LoginActivity : AppCompatActivity() {
    private val vm = LoginViewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val email = findViewById<EditText>(R.id.emailInput)
        val password = findViewById<EditText>(R.id.passwordInput)
        val button = findViewById<Button>(R.id.loginButton)

        vm.onLoginSuccess = { token ->
            getSharedPreferences("plagx", MODE_PRIVATE).edit().putString("token", token).apply()
            startActivity(Intent(this, DashboardActivity::class.java))
            finish()
        }
        vm.onError = { Toast.makeText(this, it, Toast.LENGTH_LONG).show() }

        button.setOnClickListener { vm.login(email.text.toString(), password.text.toString()) }
    }
}
