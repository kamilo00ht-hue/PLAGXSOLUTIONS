package com.plagx.mobile.ui

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.plagx.mobile.R
import com.plagx.mobile.network.CreateAppointmentRequest
import com.plagx.mobile.repository.AppointmentsRepository
import kotlinx.coroutines.launch

class ScheduleAppointmentActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_schedule)

        val token = getSharedPreferences("plagx", MODE_PRIVATE).getString("token", "") ?: ""
        val clientId = findViewById<EditText>(R.id.clientIdInput)
        val technicianId = findViewById<EditText>(R.id.technicianIdInput)
        val serviceId = findViewById<EditText>(R.id.serviceIdInput)
        val date = findViewById<EditText>(R.id.dateInput)
        val time = findViewById<EditText>(R.id.timeInput)

        findViewById<Button>(R.id.saveAppointmentButton).setOnClickListener {
            lifecycleScope.launch {
                try {
                    AppointmentsRepository().createAppointment(token, CreateAppointmentRequest(
                        clientId = clientId.text.toString(),
                        technicianId = technicianId.text.toString().ifBlank { null },
                        serviceId = serviceId.text.toString().ifBlank { null },
                        date = date.text.toString(),
                        time = time.text.toString()
                    ))
                    Toast.makeText(this@ScheduleAppointmentActivity, "Appointment created", Toast.LENGTH_LONG).show()
                    finish()
                } catch (e: Exception) {
                    Toast.makeText(this@ScheduleAppointmentActivity, e.message, Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}
