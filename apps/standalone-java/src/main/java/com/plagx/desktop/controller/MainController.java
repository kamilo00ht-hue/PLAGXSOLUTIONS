package com.plagx.desktop.controller;

import com.plagx.desktop.service.ApiService;
import com.plagx.desktop.view.MainView;
import javafx.scene.Parent;

public class MainController {
    private final MainView view;
    private final ApiService api;

    public MainController() {
        this.api = new ApiService(System.getenv().getOrDefault("PLAGX_API_BASE_URL", "http://localhost:3000"));
        this.view = new MainView();
        wireEvents();
    }

    private void wireEvents() {
        view.onLogin((email, password) -> {
            try {
                String response = api.login(email, password);
                view.showServerResponse("Login OK", response);
                api.setToken(extractToken(response));
            } catch (Exception e) {
                view.showError(e.getMessage());
            }
        });

        view.onLoadClients(() -> invokeAndShow("Clients", () -> api.getClients()));
        view.onCreateClient((payload) -> invokeAndShow("Create Client", () -> api.createClient(payload)));
        view.onLoadServices(() -> invokeAndShow("Services", () -> api.getServices()));
        view.onCreateAppointment((payload) -> invokeAndShow("Create Appointment", () -> api.createAppointment(payload)));
    }

    private void invokeAndShow(String title, ThrowingSupplier supplier) {
        try {
            view.showServerResponse(title, supplier.get());
        } catch (Exception e) {
            view.showError(e.getMessage());
        }
    }

    private String extractToken(String response) {
        int idx = response.indexOf("\"token\":\"");
        if (idx < 0) return "";
        int start = idx + 9;
        int end = response.indexOf('"', start);
        return end > start ? response.substring(start, end) : "";
    }

    public Parent getRoot() {
        return view.getRoot();
    }

    @FunctionalInterface
    private interface ThrowingSupplier {
        String get() throws Exception;
    }
}
