import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import ThankYouPage from "./components/ThankYouPage";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        toast.info(`Quantity updated in cart: ${product.name}`);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart!`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateCart = (product, quantity) => {
    setCartItems((prevItems) => {
      toast.info(`Updated quantity: ${product.name}`);
      return prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: +quantity } : item
      );
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      toast.error(`${product.name} removed from cart.`);
      return prevItems.filter((item) => item.id !== product.id);
    });
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Catalog</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Catalog onAddToCart={handleAddToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                onUpdateCart={handleUpdateCart}
                onRemoveFromCart={handleRemoveFromCart}
                onCheckout={() => {
                  if (cartItems.length > 0) {
                    toast.success("Purchase completed successfully!");
                    setCartItems([]);
                  } else {
                    toast.error("Your cart is empty.");
                  }
                }}
              />
            }
          />
          <Route
            path="/thank-you"
            element={
              <ThankYouPage
                cartItems={cartItems}
                clearCart={() => setCartItems([])}
              />
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;