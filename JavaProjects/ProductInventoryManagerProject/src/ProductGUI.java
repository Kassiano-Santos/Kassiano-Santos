import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.VBox;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.control.cell.PropertyValueFactory;

public class ProductGUI extends Application{
	
	private ProductDAO productDAO;
	private ObservableList<Product> products;
	private TableView<Product> tableView;
	private TextField inputName, inputQuantity, inputPrice;
	private ComboBox<String> statusComboBox;
	private Connection connection;
	
	
	@Override
	public void start(Stage stage) {
		connection = ConnectionDB.connectionDB(); 
		productDAO = new ProductDAO(connection);
		products = FXCollections.observableArrayList(productDAO.listAll());
		
		stage.setTitle("Product Inventory Management");
		
		VBox vBox = new VBox();
		vBox.setPadding(new Insets(10,10,10,10));
		vBox.setSpacing(10);
		
		HBox productNameBox  = new HBox();
		productNameBox.setSpacing(10);
		Label productNameLabel = new Label("Product name: ");
		inputName = new TextField();
		productNameBox.getChildren().addAll(productNameLabel, inputName);
		
		HBox quantityBox = new HBox();
		quantityBox.setSpacing(10);
		Label quantityLabel = new Label("Quantity: ");
		inputQuantity = new TextField();
		quantityBox.getChildren().addAll(quantityLabel,inputQuantity);
		
		HBox priceBox = new HBox();
		priceBox.setSpacing(10);
		Label priceLabel = new Label("Price: ");
		inputPrice = new TextField();
		priceBox.getChildren().addAll(priceLabel,inputPrice);
		
		HBox statusBox = new HBox();
		statusBox.setSpacing(10);
		Label statusLabel = new Label("Status");
		statusComboBox = new ComboBox<>();
		statusComboBox.getItems().addAll("Normal Stock","low stock");
		statusBox.getChildren().addAll(statusLabel, statusComboBox);
		
		Button addButton = new Button("Add product");
		addButton.setOnAction(e -> {
			String price = inputPrice.getText().replace(",",".");
			Product product = new Product(inputName.getText(),
					Integer.parseInt(inputQuantity.getText()),
					Double.parseDouble(price),
					statusComboBox.getValue());
			productDAO.insert(product); //inserting a new product
			products.setAll(productDAO.listAll());
			clearFields();//Clean input fields to a new insert
		});
		
		Button updateButton = new Button("Update product");
		updateButton.setOnAction(e -> {
			Product selectedProduct = tableView.getSelectionModel().getSelectedItem();//get a selected product
			if(selectedProduct != null) {
				selectedProduct.setProductName(inputName.getText());
				selectedProduct.setQuantity(Integer.parseInt(inputQuantity.getText()));
				String price = inputPrice.getText().replace(",", ".");
				selectedProduct.setPrice(Double.parseDouble(price));
				selectedProduct.setStatus(statusComboBox.getValue());
				productDAO.update(selectedProduct);
				products.setAll(productDAO.listAll());
				clearFields();
			}
		});
		Button deleteButton = new Button("Delete");
		deleteButton.setOnAction(e -> {
			Product selectedProduct = tableView.getSelectionModel().getSelectedItem();
			if(selectedProduct != null) {
				productDAO.delete(selectedProduct.getId());
				products.setAll(productDAO.listAll());
				clearFields();
			}
		} );
		
		Button clearButton = new Button("Clean");
		clearButton.setOnAction(e -> clearFields());
		
		tableView = new TableView<>();
		tableView.setItems(products);//define product list in table;
		tableView.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY_ALL_COLUMNS); //Adjust the column size
		List<TableColumn<Product, ?>> columns = List.of(
				createColumn("ID", "id"),
				createColumn("Product", "productName"),
				createColumn("Quantity","quantity"),
				createColumn("Price","Price"),
				createColumn("Status","status")
				);
		tableView.getColumns().addAll(columns);
		tableView.getSelectionModel().selectedItemProperty().addListener((obs, oldSelection, newSelection) -> {
			if(newSelection != null) {
				inputName.setText(newSelection.getProductName());
				inputQuantity.setText(String.valueOf(newSelection.getQuantity()));
				inputPrice.setText(String.valueOf(newSelection.getPrice()));
				statusComboBox.setValue(newSelection.getStatus());
				}
		});
		
		HBox buttonBox = new HBox();
		buttonBox.setSpacing(10);
		buttonBox.getChildren().addAll(addButton, updateButton, deleteButton, clearButton);
		
		vBox.getChildren().addAll(productNameBox, quantityBox,priceBox, statusBox,buttonBox,tableView);
		
		Scene scene = new Scene(vBox, 800,600);
		scene.getStylesheets().add("styles-products.css");
		stage.setScene(scene);
		stage.show();
	}
	
	 
	// O método stop é chamado automaticamente quando a aplicação javafx é encerrada
	 @Override
	 public void stop() {
		 try {
			 connection.close();
		 }catch (SQLException ex) {
			 System.err.println("Error closing connection: " + ex.getMessage());
		 }
	 }
	 
	 //limpa os campos de entrada do formulário
	 //ele é chamado ao adicionar, atualizar ou excluir um produto
	 //afim de garantir que os campos de entrada estejam prontos para uma nova entrada
	 
	 private void clearFields() {
		 inputName.clear();
		 inputQuantity.clear();
		 inputPrice.clear();
		 statusComboBox.setValue(null);
	 }
	 
	 /* 
	  * cria uma coluna para TableView
	  * @param title Título da coluna que será exibido no cabelçalho
	  * @param property A propriedade do objeto produto que esta coluna deve exibir.
	  * @return A coluna configurada para TabelView
	  * */
	 
	 private TableColumn<Product, String> createColumn(String title, String property){
		 TableColumn<Product, String> col = new TableColumn<>(title);
		 col.setCellValueFactory(new PropertyValueFactory<>(property)); // define propriendades da coluna
		 return col;
		 
	 }
	 public static void main(String[] args) {
			launch(args);
		}
}
