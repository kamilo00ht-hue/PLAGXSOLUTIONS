package com.plagx.mobile.repository

import com.plagx.mobile.network.ApiProvider
import com.plagx.mobile.network.CreateAppointmentRequest

class AppointmentsRepository {
    suspend fun createAppointment(token: String, request: CreateAppointmentRequest) =
        ApiProvider.api.createAppointment("Bearer $token", request)
}
