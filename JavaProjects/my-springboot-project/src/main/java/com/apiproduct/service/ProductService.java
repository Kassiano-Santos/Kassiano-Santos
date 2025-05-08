package com.apiproduct.service;

import com.apiproduct.model.Product;
import com.apiproduct.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
	 @Autowired
	 private ProductRepository productRepository;
	 
	 public List<Product> listAll() {
		 return productRepository.findAll();
	 }
	 
	 public Product save(Product product) {
		 return productRepository.save(product);
	 }
	 
	 public void remove(Long id) {
		 productRepository.deleteById(id);
	 }
	 
	 public Product update(Long id, Product product) {
		 if (productRepository.existsById(id)) {
			 	product.setId(id);
			 	return productRepository.save(product);
		 } else {
			 throw new RuntimeException("Product not found");
	 	 }
	 }
	
	 public Optional<Product> findById(Long id) {
		 return productRepository.findById(id);
	 }
	 
	 public List<Product>saveList(List<Product> products) {
		 return productRepository.saveAll(products);
	 }
	 
	 public List<Product>findByProducName(String productName){
		 return productRepository.findByProductName(productName);
	 }
	 
	 public List<Product>findByProductNameContaining(String productName){
		 return productRepository.findByProductNameContaining(productName);
	}
	 
	 public List<Product>findByProductNameAndStatus(String productName, String status){
		 return productRepository.findByProductNameAndStatus(productName, status);
	}
	 
	 public List<Product>findByProductNameStartingWith(String prefix){
		 return productRepository.findByProductNameStartingWith(prefix);
	 }
	 
	 public List<Product>findByProductNameEndingWith(String suffix){
		 return productRepository.findByProductNameEndingWith(suffix);
	 }
	 
	 public List<Product>findByPrice(Double price){
		 return productRepository.findByPrice(price);
	 }
	 
	 public List<Product>findByPriceGreaterThan(Double price){
		 return productRepository.findByPriceGreaterThan(price);
	 }
	 
	 public List<Product>findByPriceLessThan(Double price){
		 return productRepository.findByPriceLessThan(price);
	 }
	 /*
	 public Double findTotalPrice() {
		 return productRepository.findTotalPrice();
	 }
*/
}