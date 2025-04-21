import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;

import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;


public class ShoppingListProject extends Application {
	private ArrayList<String> shoppingList = new ArrayList<>();
	private ListView<String> visualizableList = new ListView<>();
	
	@Override
	public void start(Stage stage) {
		stage.setTitle("Shopping List App");
		TextField textFieldDescItem = new TextField();
		Button addButton = new Button("Adicionar");
		Button exportButton = new Button("Export List");
		
		Label addLabel = new Label("Type the item you want to add");
		Label labelProductList = new Label("Lista de Compras:");
		
		ObservableList<String> observableProductList = FXCollections.observableArrayList(shoppingList);
		visualizableList.setItems(observableProductList);
		
		VBox vBox = new VBox();
		vBox.getChildren().addAll(addLabel, textFieldDescItem, addButton);
		vBox.getChildren().addAll(labelProductList, visualizableList, exportButton);
		vBox.setSpacing(10);
		vBox.setPadding(new Insets(10));
		
		addButton.setOnAction(e -> {
			String item = textFieldDescItem.getText(); //Gets the entered text and stores it in the variable
			if(!item.isEmpty()) {
				shoppingList.add(item);//The entered text is added to the shopping list
				visualizableList.getItems().add(item);//Add text to the Viewable list
				textFieldDescItem.clear();	
			}
		});
		
		exportButton.setOnAction(e->{
			try {
				File file = new File("shoppinglist.txt");
				PrintWriter writer = new PrintWriter(file);//PrintWriter is used to write the list items to the file.
				for(String item : shoppingList) {
					writer.println(item);// Writes each item from the list to the file and adds a new line for each item
				}
				writer.close();
			} catch (Exception ex){
				System.out.println("Erro ocorrido: " + ex.getMessage());
			}
		});
		Scene scene = new Scene(vBox, 350,300);
		stage.setScene(scene);
		stage.show();
	}
	
	public static void main(String[] args) {
		launch(args);
	}
}
