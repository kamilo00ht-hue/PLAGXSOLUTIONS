package com.plagx.mobile.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.plagx.mobile.repository.AuthRepository
import kotlinx.coroutines.launch

class LoginViewModel(private val repository: AuthRepository = AuthRepository()) : ViewModel() {
    var onLoginSuccess: ((String) -> Unit)? = null
    var onError: ((String) -> Unit)? = null

    fun login(email: String, password: String) {
        viewModelScope.launch {
            try {
                val response = repository.login(email, password)
                onLoginSuccess?.invoke(response.token)
            } catch (e: Exception) {
                onError?.invoke(e.message ?: "Login failed")
            }
        }
    }
}
