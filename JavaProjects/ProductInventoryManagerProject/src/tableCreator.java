import java.sql.Connection;
import java.sql.Statement;
import java.sql.SQLException;

public class tableCreator {

	public static void main(String[] args) {
		try(Connection connection = ConnectionDB.connectionDB();
			Statement stmt = connection.createStatement()){
			
			String sqlCommand = "CREATE TABLE products(" +
					"id_product INTEGER PRIMARY KEY," +
					"product_name TEXT NOT NULL," +
					"quantity INTEGER," +
					"price REAL," +
					"status TEXT" +
					");";
			
			System.out.println(sqlCommand);
			stmt.execute(sqlCommand);
			System.out.println("Products table created successfully. ");
			
		} catch (SQLException ex) {
			System.err.println("Error creating table: " + ex.getMessage());
			ex.printStackTrace();
		}
	}
}
