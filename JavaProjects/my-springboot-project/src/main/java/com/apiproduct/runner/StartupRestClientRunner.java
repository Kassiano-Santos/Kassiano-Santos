package com.apiproduct.runner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.apiproduct.model.Product;

import java.util.Arrays;
import java.util.List;

@Component
public class StartupRestClientRunner implements CommandLineRunner{
	@Override
	public void run(String... Args) throws Exception {
		System.out.println("RestClient running.");
		
		RestTemplate restTemplate = new RestTemplate();
		String url = "http://localhost:8080/products";
		
		Product[] productsArray = restTemplate.getForObject(url, Product[].class);
		List<Product> products = Arrays.asList(productsArray);
		
		products.forEach(product -> System.out.println("ID:" + product.getId() + " - " + product.getProductName() + ": " 
				+ "quantity: " + product.getQuantity() + " / Price: " + product.getPrice() + " / status: " 
				+ product.getStatus())
			);
	}
}
