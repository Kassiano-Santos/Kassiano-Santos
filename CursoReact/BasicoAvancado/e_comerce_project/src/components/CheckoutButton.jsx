import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutButton = ({ cartItems }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      toast.success("Purchase completed successfully!");
      navigate("/thank-you", { state: { cartItems } }); // Passa os cartItems via state
      // Não limpe o cartItems aqui
    } else {
      toast.error("Your cart is empty.");
    }
  };

  return <button onClick={handleCheckout}>Checkout</button>;
};

export default CheckoutButton;