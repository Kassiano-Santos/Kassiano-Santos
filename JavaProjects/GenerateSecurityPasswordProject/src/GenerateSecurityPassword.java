

import java.security.SecureRandom;
import java.util.Scanner;
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;



import javafx.stage.Stage;

public class GenerateSecurityPassword extends Application{
	
	private static final String CARACTERES = "qwertyuiopasdfghjklçzxcvbnmQWERTYUIOPASDFGHJKLÇZXCVBNM!@#$%*()-_,.<>|/?"; 
	
	@Override
	public void start(Stage stage) {
		stage.setTitle("Password Generator");
		
		Label labelPassSize = new Label("Password Size");
		TextField passSizeField = new TextField();
		passSizeField.setText("8");
		
		Label passGenerated = new Label("Password Generated: ");
		TextField passGenField = new TextField();
		passGenField.setEditable(false);
		
		Button passGenbutton = new Button("Generate Password");
		passGenbutton.setOnAction(e -> {
			int passSize = Integer.parseInt(passSizeField.getText());
			String password = generatePassword(passSize);
			passGenField.setText(password);
		});
		
		VBox vBox = new VBox (labelPassSize, passSizeField, passGenbutton, passGenerated,  passGenField);
		vBox.setSpacing(10);
		vBox.setPadding(new Insets(10));
				
		Scene scene = new Scene(vBox, 250,200);
		stage.setScene(scene);
		stage.show();
	}
	
	public static String generatePassword(int lengthed){
		SecureRandom generateRandomNumber = new SecureRandom();
		StringBuilder password = new StringBuilder(lengthed);
		for(int i = 0; i < lengthed; i++) {
			int index = generateRandomNumber.nextInt(CARACTERES.length());
			password.append(CARACTERES.charAt(index));
		}
		return password.toString();
		
	}

	public static void main(String[] args) {
		/*
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter the number of characters you want to create the password: ");
		int lengthedPassword = scanner.nextInt();
		String password = generatePassword(lengthedPassword);
		System.out.println("Password generated: " + password);
		*/
		launch(args);
	}

}
