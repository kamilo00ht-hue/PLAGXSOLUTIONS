package com.plagx.desktop;

import com.plagx.desktop.controller.MainController;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class PlagXDesktopApp extends Application {
    @Override
    public void start(Stage stage) {
        MainController controller = new MainController();
        stage.setTitle("PlagX Desktop");
        stage.setScene(new Scene(controller.getRoot(), 980, 640));
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
