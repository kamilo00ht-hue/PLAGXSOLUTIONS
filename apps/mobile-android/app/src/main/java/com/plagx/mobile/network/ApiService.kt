package com.plagx.mobile.network

import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface ApiService {
    @POST("/api/auth/login")
    suspend fun login(@Body request: LoginRequest): LoginResponse

    @GET("/api/clients")
    suspend fun getClients(@Header("Authorization") token: String): List<ClientDto>

    @POST("/api/clients")
    suspend fun createClient(@Header("Authorization") token: String, @Body request: CreateClientRequest): ClientDto

    @GET("/api/services")
    suspend fun getServices(@Header("Authorization") token: String): List<ServiceDto>

    @POST("/api/appointments")
    suspend fun createAppointment(@Header("Authorization") token: String, @Body request: CreateAppointmentRequest): Map<String, String>
}
