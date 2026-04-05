package com.plagx.mobile.repository

import com.plagx.mobile.network.ApiProvider
import com.plagx.mobile.network.CreateClientRequest

class ClientsRepository {
    suspend fun getClients(token: String) = ApiProvider.api.getClients("Bearer $token")
    suspend fun createClient(token: String, request: CreateClientRequest) = ApiProvider.api.createClient("Bearer $token", request)
}
