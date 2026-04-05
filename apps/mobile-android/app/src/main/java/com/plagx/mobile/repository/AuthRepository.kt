package com.plagx.mobile.repository

import com.plagx.mobile.network.ApiProvider
import com.plagx.mobile.network.LoginRequest

class AuthRepository {
    suspend fun login(email: String, password: String) = ApiProvider.api.login(LoginRequest(email, password))
}
