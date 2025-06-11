// src/components/ProductGrid.js
import React from 'react';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart, onHighGrocery, onNoSale, searchTerm }) => {

  return (
  <div className="product-grid">
    {/* Fixed buttons as the first two grid items */}
  <button className="product-card fixed-action high-grocery" onClick={onHighGrocery}>
    High Grocery
  </button>
  <button className="product-card fixed-action no-sale" onClick={onNoSale}>
    No Sale
  </button>
    {products.length === 0 ? (
      <p style={{ textAlign: 'center', width: '100%' }}>No products found.</p>
    ) : (
      products.map((product) => (
        <button key={product.id} onClick={() => onAddToCart(product)} className="product-card">
          {/* <img src={product.image} alt={product.name} className="product-img" /> */}
          <div>{product.name}</div>
          {/* <div>${product.price.toFixed(2)}</div> */}
        </button>
      ))
    )}

   
  </div>
);

};

export default ProductGrid;
