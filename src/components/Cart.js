// src/components/Cart.js
import React from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Make sure path is correct

const Cart = ({ cart, onIncrease, onDecrease, onRemove }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);
  
// if(total <=0){
//     alert("Cart Empty hai laude");
//     return;
//   }
  const handleCheckout = async (paymentMethod) => {
    const order = {
      storeId: "sevenpos-store-1", // Adjust for multi-store use later
      timestamp: serverTimestamp(),
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      createdBy: "Sameer", // Optional: who made the sale
    };

    try {
      await addDoc(collection(db, "orders"), order);
      alert(`Order placed using ${paymentMethod}`);
     // window.location.reload(); // Quick reset after order placed

     window.location.href = "/receipt";

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="cart-wrapper">
      <h2>🧾 Cart</h2>
      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{item.name}</strong> - ${item.price.toFixed(2)}
            <div>
              Qty:
              <button onClick={() => onDecrease(item)}>-</button>
              <span style={{ margin: '0 8px' }}>{item.quantity}</span>
              <button onClick={() => onIncrease(item)}>+</button>
              <button
                onClick={() => onRemove(item)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}

      <hr />
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax (7%): ${tax}</p>
      <h3>Total: ${total}</h3>

      <div className="payment-buttons">
        <button onClick={() => handleCheckout("Cash")}>💵 Cash</button>
        <button onClick={() => handleCheckout("Card")}>💳 Card</button>
        <button onClick={() => handleCheckout("Loyalty")}>🎁 Loyalty</button>
      </div>
    </div>
  );
};

export default Cart;
