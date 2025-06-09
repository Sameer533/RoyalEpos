// 🔥 Redesigned SalesScreen.js
import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import '../styles/SalesScreen.css';

const productList = [
  { id: 1, name: 'Coffee', price: 2.5, category: 'Drinks', image: 'https://cdn-icons-png.flaticon.com/512/2935/2935359.png' },
  { id: 2, name: 'Burger', price: 5, category: 'Food', image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' },
  { id: 3, name: 'Hot Dog', price: 3, category: 'Food', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
  { id: 4, name: 'Soda', price: 1.5, category: 'Drinks', image: 'https://cdn-icons-png.flaticon.com/512/701/701995.png' },
  { id: 5, name: 'Chips', price: 2, category: 'Snacks', image: 'https://cdn-icons-png.flaticon.com/512/4257/4257819.png' },
  { id: 6, name: 'Donut', price: 2.2, category: 'Snacks', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046786.png' },
  { id: 7, name: 'DefCoffee', price: 2.5, category: 'Drinks', image: 'https://cdn-icons-png.flaticon.com/512/2935/2935359.png' },
];

const SalesScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (product) => {
    setCart(cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQty = (product) => {
    const item = cart.find((item) => item.id === product.id);
    if (item.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const removeItem = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="sales-screen">
      <div className="left-panel">
        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="category-buttons">
            {['All', 'Drinks', 'Food', 'Snacks'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'active' : ''}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>
      <Cart
        cart={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        clearCart={clearCart}
      />
    </div>
  );
};

export default SalesScreen;
