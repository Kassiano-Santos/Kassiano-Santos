import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;

public class MiniWebNavigator extends Application{

	@Override
	public void start(Stage stage) {
		TextField urlField = new TextField();
		WebView browser = new WebView();
		WebEngine engine = browser.getEngine();
		
		urlField.setOnAction(e -> engine.load(formatterUrl(urlField.getText())));
		
		VBox vBox = new VBox();
		vBox.getChildren().addAll(urlField, browser);
		Scene scene = new Scene(vBox);
		stage.setTitle("My Java Braowser");
		stage.setScene(scene);
		stage.show();
	}
	
	public static void main(String[] args) {
		launch(args);
	}
	
	public String formatterUrl (String url) {
		if(!url.startsWith("https://") && !url.startsWith("https://")) {
			url = "https://" + url;
		}
		return url;
		
	}

}
