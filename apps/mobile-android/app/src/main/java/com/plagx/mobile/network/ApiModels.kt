package com.plagx.mobile.network

data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val token: String, val userId: String, val companyId: String, val role: String, val subscriptionActive: Boolean)

data class ClientDto(val id: String, val name: String, val email: String, val phone: String, val address: String, val isActive: Boolean)
data class CreateClientRequest(val name: String, val email: String, val phone: String, val address: String, val isActive: Boolean = true)
data class ServiceDto(val id: String, val name: String, val description: String, val price: Int, val durationMinutes: Int, val status: String)
data class CreateAppointmentRequest(val clientId: String, val technicianId: String?, val serviceId: String?, val date: String, val time: String, val status: String = "scheduled")
