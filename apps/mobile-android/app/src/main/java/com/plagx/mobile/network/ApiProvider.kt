package com.plagx.mobile.network

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiProvider {
    private val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl(System.getenv("PLAGX_API_BASE_URL") ?: "http://10.0.2.2:3000")
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val api: ApiService = retrofit.create(ApiService::class.java)
}
