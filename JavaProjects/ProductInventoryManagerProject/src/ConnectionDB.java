import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionDB {
	private static final String URL_JDBC_DEFAULT = "jdbc:sqlite:my_database.db";
	
	public static Connection connectionDB(){
		try{
			return DriverManager.getConnection(URL_JDBC_DEFAULT);
		}catch(SQLException ex){
			System.err.println("Error connecting to database: " + ex.getMessage());
			return null;
		}
	}
	
	public static Connection genericConnect(String url, String user, String password) {
		try {
			return DriverManager.getConnection(url, user, password);
		} catch(SQLException ex) {
			System.err.println("Error connecting to database: " + ex.getMessage());
			return null;
		}
	}
}
