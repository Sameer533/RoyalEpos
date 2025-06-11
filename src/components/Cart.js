// src/components/Cart.js
import React from 'react';
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig"; // adjust path as needed
import "./Cart.css" ;
const Cart = ({ cart, onIncrease, onDecrease, onRemove }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const handleCheckout = async (paymentMethod) => {
    if (cart.length === 0) {
      toast.warning("🛒 Your cart is empty!", { position: "top-center" });
      return;
    }

    const order = {
      storeId: "sevenpos-store-1",
      timestamp: serverTimestamp(),
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      createdBy: "Sameer"
    };

    try {
      await addDoc(collection(db, "orders"), order);
      window.location.href = "/receipt";
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to place order.");
    }
  };

 return (
  <div className="cart-wrapper">
    <h2>🧾 Cart</h2>

    <div className="cart-items">
      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-price">${item.price.toFixed(2)}</div>

            <div className="cart-qty">
              <button onClick={() => onDecrease(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onIncrease(item)}>+</button>
              <button onClick={() => onRemove(item)} className="cart-remove">✕</button>
            </div>
          </div>
        ))
      )}
    </div>

    <div className="cart-footer">
      <hr />
      <div className="cart-total">Subtotal: ${subtotal.toFixed(2)}</div>
      <div className="cart-total">Tax (7%): ${tax}</div>
      <div className="cart-total">Total: <strong>${total}</strong></div>

      <div className="payment-buttons">
        <button onClick={() => handleCheckout("Cash")}>💵 Cash</button>
        <button onClick={() => handleCheckout("Card")}>💳 Card</button>
      </div>
    </div>
  </div>
);

};

export default Cart;
