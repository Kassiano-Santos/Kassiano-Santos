import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class HangmanProject {

	public static void main(String[] args) {
		Scanner scanner = new Scanner (System.in);
		ArrayList<String> secretWords = new ArrayList<>(); //Este arrayList irá conter 3 plavaras secretas
		secretWords.add("cobra");// cobra está no indice zero e tem 5 letras
		secretWords.add("elefante");
		secretWords.add("girafa");
		
		Random random = new Random();
		int arrayListSize = secretWords.size();
		int rdmIdxWordGen = random.nextInt(arrayListSize);
		String wordSecret = secretWords.get(rdmIdxWordGen);//select a ramdom word secret
		
		ArrayList<Character> uncovdLetters = new ArrayList<>(); 
		
		for(int i = 0; i < wordSecret.length(); i++ ) {
			uncovdLetters.add('_');
		}
		
		int attempts = 6;
		boolean discoveredLetter = false;
		
		while(!discoveredLetter && attempts> 0) {
			System.out.println();
			System.out.println("Palavra: " + uncovdLetters);
			System.out.print("Chute uma letra: ");
			char guess = scanner.next().charAt(0);
			
			boolean gotIt = false;
			for(int i = 0; i < wordSecret.length(); i++) {
				if(wordSecret.charAt(i) == guess) {
					uncovdLetters.set(i, guess);
					gotIt = true;					
				}
			}
			if(!gotIt) {
				attempts--;
				System.out.println("You still have " + attempts + " attempts.");
			}
			
			discoveredLetter = !uncovdLetters.contains('_');
		}
		if(discoveredLetter) {
			System.out.println("Congratulations, you got it!!! The Word was: " + wordSecret + ".");
		}else {
			System.out.println("You Lose =/ The word was: " + wordSecret + ".");
		}
	}
}
