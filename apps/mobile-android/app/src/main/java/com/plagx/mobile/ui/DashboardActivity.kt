package com.plagx.mobile.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.plagx.mobile.R

class DashboardActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        findViewById<Button>(R.id.clientsButton).setOnClickListener { startActivity(Intent(this, ClientsActivity::class.java)) }
        findViewById<Button>(R.id.createClientButton).setOnClickListener { startActivity(Intent(this, CreateClientActivity::class.java)) }
        findViewById<Button>(R.id.scheduleButton).setOnClickListener { startActivity(Intent(this, ScheduleAppointmentActivity::class.java)) }
    }
}
