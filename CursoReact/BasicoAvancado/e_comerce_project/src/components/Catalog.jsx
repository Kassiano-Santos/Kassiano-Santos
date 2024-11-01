import React, { useState, useEffect } from "react";
import Product from "./Product";
import productsData from "../data/products_mock.json";

const Catalog = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Loading products from mock JSON
    // In a real scenario, you could make an HTTP request here
    setProducts(productsData);
  }, []);

  return (
    <div>
      <h1>Product Catalog</h1>
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;