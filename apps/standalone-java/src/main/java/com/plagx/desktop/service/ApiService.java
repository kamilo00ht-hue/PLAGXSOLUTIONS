package com.plagx.desktop.service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

public class ApiService {
    private final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();
    private final String baseUrl;
    private String token;

    public ApiService(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String login(String email, String password) throws IOException, InterruptedException {
        String body = "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}";
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/api/auth/login"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        if (response.statusCode() >= 400) {
            throw new IOException("Login failed: " + response.body());
        }
        return response.body();
    }

    public String getClients() throws IOException, InterruptedException {
        return sendAuthorized("/api/clients", "GET", null);
    }

    public String createClient(String payload) throws IOException, InterruptedException {
        return sendAuthorized("/api/clients", "POST", payload);
    }

    public String getServices() throws IOException, InterruptedException {
        return sendAuthorized("/api/services", "GET", null);
    }

    public String createAppointment(String payload) throws IOException, InterruptedException {
        return sendAuthorized("/api/appointments", "POST", payload);
    }

    private String sendAuthorized(String path, String method, String body) throws IOException, InterruptedException {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .header("Authorization", "Bearer " + token)
                .header("Content-Type", "application/json");

        if ("POST".equals(method)) {
            builder.POST(HttpRequest.BodyPublishers.ofString(body == null ? "{}" : body, StandardCharsets.UTF_8));
        } else {
            builder.GET();
        }

        HttpResponse<String> response = client.send(builder.build(), HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        if (response.statusCode() >= 400) {
            throw new IOException("Request failed: " + response.statusCode() + " - " + response.body());
        }
        return response.body();
    }
}
