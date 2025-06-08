// src/components/Cart.js
import React from 'react';

const Cart = ({ cart, onIncrease, onDecrease, onRemove }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.07).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className="cart-wrapper" >
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
              <button onClick={() => onRemove(item)} style={{ marginLeft: '10px', color: 'red' }}>
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
        <button>Cash</button>
        <button>Card</button>
        <button>Loyalty</button>
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
