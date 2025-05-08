package com.apiproduct.repository;

import com.apiproduct.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository <Product, Long> {
	List<Product> findByProductName(String productName);
	List<Product> findByProductNameContaining(String productName);
	List<Product> findByProductNameAndStatus(String productName, String status);
	List<Product> findByProductNameStartingWith(String prefix);
	List<Product> findByProductNameEndingWith(String suffix);
	
	List<Product> findByPrice(Double price);
	List<Product> findByPriceGreaterThan(Double price);
	List<Product> findByPriceLessThan(Double price);
	
	@Query("SELECT SUM(p.price) FROM Product p")
	Double findByTotalPrice();
}
