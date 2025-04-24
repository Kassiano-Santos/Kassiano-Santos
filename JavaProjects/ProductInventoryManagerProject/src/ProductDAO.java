import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {
	private final Connection DB_CONNECTION;
	
	public ProductDAO(Connection connection) {
		this.DB_CONNECTION = connection;
	}
	
	public void insert(Product product) {
		String sql = "INSERT INTO products (product_name, quantity, price, status) VALUES(?, ?, ?, ?)";
		try(PreparedStatement stmt = DB_CONNECTION.prepareStatement(sql)) {
			stmt.setString(1, product.getProductName());
			stmt.setInt(2, product.getQuantity());
			stmt.setDouble(3, product.getPrice());
			stmt.setString(4, product.getStatus());
			stmt.executeUpdate();
			
		}catch(SQLException ex){
			System.err.println("Error inserting table: " + ex.getMessage());
		}
	}
	
	public void deleteAll() {
		String sql = "DELETE from products";
		try(PreparedStatement stmt = DB_CONNECTION.prepareStatement(sql)){
			stmt.executeUpdate();
			
		}catch (SQLException ex) {
			System.err.println("Error deleting all products: " + ex.getMessage());
		}
	}
	
	public Product queryId(int id) {
		String sql = "SELECT * FROM products WHERE id_product = ? ";
		try(PreparedStatement stmt = DB_CONNECTION.prepareStatement(sql)){
			stmt.setInt(1, id);
			try(ResultSet rs = stmt.executeQuery()){
				if(rs.next()) {
					Product product = new Product();
					product.setId(rs.getInt("id_product"));
					product.setProductName(rs.getString("product_name"));
					product.setPrice(rs.getDouble("price"));
					product.setQuantity(rs.getInt("quantity"));
					product.setStatus(rs.getString("status"));
					return product;
				}
			}
		} catch (SQLException ex) {
			System.err.println("Error when querying product by id: " + ex.getMessage());
		}
		return null;
	}
	
	public void update(Product product) {
		String sql = "UPDATE products set product_name = ?, quantity = ?, price = ?, status = ? WHERE id_product = ?";
		try(PreparedStatement stmt = DB_CONNECTION.prepareStatement(sql)){
			stmt.setString(1, product.getProductName());
			stmt.setInt(2, product.getQuantity());
			stmt.setDouble(3, product.getPrice());
			stmt.setString(4, product.getStatus());
			stmt.setInt(5, product.getId());
			stmt.executeUpdate();
		}catch (SQLException ex) {
			System.err.println("Erro updating product: " + ex.getMessage());
		}
	}
	
	public void delete(int id) {
		String sql = "DELETE from products where id_product = ?";
		try(PreparedStatement stmt = DB_CONNECTION.prepareStatement(sql)){
			stmt.setInt(1, id);
			stmt.executeUpdate();
		} catch (SQLException ex) {
			System.err.println("Error deleting product: " + ex.getMessage());
		}
	}
	
	public List<Product> listAll(){
		List <Product> productList = new ArrayList<>();
		String sql = "SELECT * FROM products;";
		try(PreparedStatement stmt = DB_CONNECTION.prepareStatement(sql)){
			ResultSet rs = stmt.executeQuery();
			while(rs.next()) {
				Product product = new Product();
				product.setId(rs.getInt("id_product"));
				product.setProductName(rs.getString("product_name"));
				product.setQuantity(rs.getInt("quantity"));
				product.setPrice(rs.getDouble("price"));
				product.setStatus(rs.getString("status"));
				productList.add(product);
			}
			
		}catch(SQLException ex) {
			System.err.println("Error Listing products: " + ex.getMessage());
		}
		return productList;
	}
}
