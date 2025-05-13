package BMICalculatorProject;
import javafx.application.*;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class BMICalculatorProject extends Application {
   @Override
	public void start(Stage stage) {
	   //Labels for input fields
	   Label labelWeight = new Label("Weight: ");
	   Label labelHeight = new Label("Height: ");
	   
	   //Fields for input data
	   TextField fieldWeight = new TextField();
	   fieldWeight.setPromptText("Weight in KG: ");
	   TextField fieldHeight = new TextField();
	   fieldHeight.setPromptText("Height in Meters: ");
	   
	   //Label to display BMI result
	   Label labelResult = new Label();
	   
	   Button bmiCalculateButton = new Button("Calculate BMI ");
	   
	   bmiCalculateButton.setOnAction(e -> {
		   try {
		   double weight = Double.parseDouble(fieldWeight.getText().replace(",", "."));
		   double height = Double.parseDouble(fieldHeight.getText().replace(",", "."));
		   
		   double bmi = weight / (height * height);
		   labelResult.setText(String.format("Your BMI is: %.2f", bmi));
		   } catch(NumberFormatException ex) {
			   labelResult.setText("Please enter valid numbers for Weight and Height.");
			   
		   }
	   });
	   
	   //Vertical Layout
	   VBox layout = new VBox(
		   10, labelWeight, fieldWeight,labelHeight, fieldHeight, labelResult, bmiCalculateButton 
	   );
	   layout.setPadding(new Insets(10));
	   layout.setAlignment(Pos.CENTER);
	   
	   //Stage Scene
	   Scene scene = new Scene(layout, 350,250);
	   stage.setTitle("BMI Calculator");
	   stage.setScene(scene);
	   stage.show();
   }
   
   public static void main(String[] args) {
	   launch(args);
   }
      
}
