import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import javafx.animation.Animation;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.util.Duration;
import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class DigitalWatch extends Application {
	final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");
	
	@Override
	public void start(Stage stage) {
		Label labelTime = new Label();
		labelTime.setStyle("-fx-font-size: 24pt; -fx-text-fill: yellow;");
		
		//KeyFrame Create
		KeyFrame keyFrameUpdate = new KeyFrame(Duration.ZERO, e -> {
			labelTime.setText(LocalDateTime.now().format(FORMATTER));
		});
		
		//creating another Keyframe that defines the update interval
		KeyFrame keyFrameInterval = new KeyFrame(Duration.seconds(1));
		
		//Timeline Create and adding Keyframes
		Timeline watch = new Timeline();
		watch.getKeyFrames().addAll(keyFrameUpdate, keyFrameInterval);
		
		//Defining that the action of updating the Label with the current time will be done every second
		watch.setCycleCount(Animation.INDEFINITE);
		watch.play();
		
		VBox vBoxLayout = new VBox(labelTime);
		vBoxLayout.setAlignment(Pos.CENTER);
		vBoxLayout.setStyle("-fx-background-color: black");
		
		Scene scene = new Scene(vBoxLayout, 300,100);
		stage.setTitle("Digital Wacth");
		stage.setScene(scene);
		stage.show();
		
	}
	public static void main(String[] args) {
		launch(args);
	}
}
