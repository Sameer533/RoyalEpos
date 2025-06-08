// src/components/ProductGrid.js
import React from 'react';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <button key={product.id} onClick={() => onAddToCart(product)} className="product-card">
          <img src={product.image} alt={product.name} className="product-img" />
          <div>{product.name}</div>
          <div>${product.price.toFixed(2)}</div>
        </button>
      ))}
    </div>
  );
};

export default ProductGrid;
