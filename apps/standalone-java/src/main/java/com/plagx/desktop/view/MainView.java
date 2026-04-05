package com.plagx.desktop.view;

import java.util.function.BiConsumer;
import java.util.function.Consumer;
import javafx.geometry.Insets;
import javafx.scene.Parent;
import javafx.scene.control.*;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

public class MainView {
    private final BorderPane root = new BorderPane();
    private final TextField email = new TextField();
    private final PasswordField password = new PasswordField();
    private final TextArea payload = new TextArea();
    private final TextArea output = new TextArea();

    private final Button loginBtn = new Button("Login");
    private final Button clientsBtn = new Button("Get Clients");
    private final Button createClientBtn = new Button("Create Client");
    private final Button servicesBtn = new Button("Get Services");
    private final Button createAppointmentBtn = new Button("Create Appointment");

    public MainView() {
        email.setPromptText("Email");
        password.setPromptText("Password");
        payload.setPromptText("JSON payload for create actions");
        output.setEditable(false);

        VBox left = new VBox(10, new Label("PlagX Desktop"), email, password, loginBtn, clientsBtn, createClientBtn, servicesBtn, createAppointmentBtn);
        left.setPadding(new Insets(16));

        VBox center = new VBox(10, new Label("Request Payload"), payload, new Label("Response"), output);
        center.setPadding(new Insets(16));

        root.setLeft(left);
        root.setCenter(center);
    }

    public Parent getRoot() {
        return root;
    }

    public void onLogin(BiConsumer<String, String> callback) {
        loginBtn.setOnAction(e -> callback.accept(email.getText(), password.getText()));
    }

    public void onLoadClients(Runnable callback) {
        clientsBtn.setOnAction(e -> callback.run());
    }

    public void onCreateClient(Consumer<String> callback) {
        createClientBtn.setOnAction(e -> callback.accept(payload.getText()));
    }

    public void onLoadServices(Runnable callback) {
        servicesBtn.setOnAction(e -> callback.run());
    }

    public void onCreateAppointment(Consumer<String> callback) {
        createAppointmentBtn.setOnAction(e -> callback.accept(payload.getText()));
    }

    public void showServerResponse(String title, String body) {
        output.setText("[" + title + "]\n" + body);
    }

    public void showError(String message) {
        output.setText("[ERROR]\n" + message);
    }
}
