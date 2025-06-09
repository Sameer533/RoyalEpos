// src/components/ProductAddForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ProductAddForm.css'; // (optional)

const ProductAddForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    barcode: '',
    category: '',
    storeId: 'store_001', // default for now
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        ...product,
        price: parseFloat(product.price), // convert to number
      });
      alert('✅ Product Added');
      setProduct({ name: '', price: '', barcode: '', category: '', storeId: 'store_001' });
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Error adding product');
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="barcode"
        placeholder="Scan or Type Barcode"
        value={product.barcode}
        onChange={handleChange}
      />
      <select name="category" value={product.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Drinks">Drinks</option>
        <option value="Snacks">Snacks</option>
        <option value="Food">Food</option>
        <option value="Donations">Donations</option>
      </select>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductAddForm;
