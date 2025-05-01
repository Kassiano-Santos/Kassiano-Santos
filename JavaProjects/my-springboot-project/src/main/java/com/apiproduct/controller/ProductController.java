package com.apiproduct.controller;

import com.apiproduct.model.Product;
import com.apiproduct.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/products")
public class ProductController {
	 @Autowired
	 private ProductService productService;
	 
	 @GetMapping
	 public List<Product> listAll() {
		 return productService.listAll();
	 }
	 
	 @PostMapping
	 public Product save(@RequestBody Product product) {
		 return productService.save(product);
	 }
	 
	 @PutMapping("/{id}")
	 public Product update(@PathVariable Long id, @RequestBody Product product) {
		 return productService.update(id, product);
	 }
	 
	 @DeleteMapping("/{id}")
	 public void deletar(@PathVariable Long id) {
		 productService.remove(id);
	 }
	 
	 @GetMapping("/{id}")
	 public Optional<Product> findById(@PathVariable Long id) {
		 return productService.findById(id);
	 }
	 
	 @PostMapping("/saveList")
	 public List<Product> saveList(@RequestBody List<Product>products) {
		 return productService.saveList(products);
	 }
	 
	 @GetMapping("/searchByName")
	 public List<Product> searchByProductName(@RequestParam String productName){
		 return productService.findByProducName(productName);
	 }
	 
	 @GetMapping("/searchByNameContaining")
	 public List<Product> searchByProductNameContaining(@RequestParam String productName){
		 return productService.findByProductNameContaining(productName);
	 }
	 
	 @GetMapping("/searchByNameAndStatus")
	 public List<Product> searchByProductNameAndStatus(@RequestParam String productName, String status){
		 return productService.findByProductNameAndStatus(productName, status);
	 }
	 
	 @GetMapping("/searchByNameStartingWith")
	 public List<Product> findByProductNameStartingWith(@RequestParam String prefix){
		 return productService.findByProductNameStartingWith(prefix);
	 }
	 @GetMapping("/searchByNameEndingWith")
	 public List<Product> findByProductNameEndingWith(@RequestParam String suffix){
		 return productService.findByProductNameEndingWith(suffix);
	 }
	 
}