package com.apiproduct.client;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.apiproduct.model.Product;

import java.util.Arrays;
import java.util.List;

public class CRUDJavaClient {
	
	private static final String BASE_URL = "http://localhost:8080/products";
	private RestTemplate restTemplate;
	
	public CRUDJavaClient() {
		this.restTemplate = new RestTemplate();
	}
	
	public void listAll() {
		ResponseEntity<Product[]> response = restTemplate.getForEntity(BASE_URL, Product[].class);
		List<Product> products = Arrays.asList(response.getBody());
		products.forEach(product -> {
			System.out.println("ID: " + product.getId());
			System.out.println("Product Name:" + product.getProductName());
			System.out.println("Price: " + product.getPrice());
			System.out.println("Quantity: " + product.getQuantity());
			System.out.println("Status: " + product.getStatus());
			System.out.println("----------------------------------------");
		});
	}
	
	public Product Add(Product product){
		HttpEntity<Product> request = new HttpEntity<>(product);
		return restTemplate.postForObject(BASE_URL, request, Product.class);
	}
	
	public void remove(long id) {
		restTemplate.delete(BASE_URL + "/" + id);
	}
	public Product update(long id, Product product) {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<Product> request = new HttpEntity<>(product,headers);
		ResponseEntity<Product> response = restTemplate.exchange(BASE_URL + "/" + id, HttpMethod.PUT, request, Product.class);
		return response.getBody();
	}
	
	public Product findById(long id) {
		ResponseEntity<Product> response = restTemplate.getForEntity(BASE_URL + "/" + id, Product.class);
		return response.getBody();
	}
	
	public static void main(String[] args) {
		CRUDJavaClient client = new CRUDJavaClient();
		
		 /*
		//========== Create a new Product //==========
		Product newProduct = new Product();
		newProduct.setProductName("Skate Proficional");
		newProduct.setPrice(19802.43);
		newProduct.setQuantity(3456);
		newProduct.setStatus("Disponível");
		
		System.out.println("Create a new product.");
		client.Add(newProduct);
		client.listAll();
		*/
		
		/*
		//========== Update a Product //==========
		Product updateProduct = client.findById(XXX);
		updateProduct.setProductName("Skate Infantil");
		updateProduct.setPrice(124567.98);
		
		System.out.println("Update a product.");
		client.update(updateProduct.getId(), updateProduct);
		client.listAll();
		*/
		
		/*		
		//========== Delete a Product //==========
		System.out.println("Delete Product.");
		client.remove(XXX);
		client.listAll();
		*/
		
		
	}

}
