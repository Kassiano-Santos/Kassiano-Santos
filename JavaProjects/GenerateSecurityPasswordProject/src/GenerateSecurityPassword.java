import java.security.SecureRandom;
import java.util.Scanner;

import javafx.application.Application;
import javafx.stage.Stage;

public class GenerateSecurityPassword extends Application{
	
	private static final String CARACTERES = "qwertyuiopasdfghjklçzxcvbnmQWERTYUIOPASDFGHJKLÇZXCVBNM!@#$%*()-_,.<>|/?"; 
	
	@Override
	public void start(Stage stage) {
		
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
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter the number of characters you want to create the password: ");
		int lengthedPassword = scanner.nextInt();
		String password = generatePassword(lengthedPassword);
		System.out.println("Password generated: " + password);
	}

}
