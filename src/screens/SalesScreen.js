// src/screens/SalesScreen.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import '../styles/SalesScreen.css';
import Sidebar from '../components/Sidebar';

const SalesScreen = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
 const [barcode, setBarcode] = useState('');
  const barcodeInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
  if (barcodeInputRef.current) {
    barcodeInputRef.current.focus();
  }
}, []);


  const filteredProducts = products.filter((product) => {
     

    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    if (search.trim() !== '') {
    return matchesSearch;
  }
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
const handleHighGrocery = () => {
  const price = prompt("Enter price for High Grocery item:");

  const parsed = parseFloat(price);
  if (!isNaN(parsed) && parsed > 0) {
    const newItem = {
      id: Date.now(), // temporary unique ID
      name: "High Grocery",
      price: parsed,
      quantity: 1,
    };
    setCart([...cart, newItem]);
  } else {
    toast.error("Invalid price entered");
  }
};
const handleScanSubmit = async (e) => {
  if (e.key === 'Enter') {
    const upc = barcode.trim();
    if (!upc) return;

    try {
      const q = query(collection(db, 'products'), where('barcode', '==', upc));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const product = doc.data();
          handleAddToCart({ ...product, id: doc.id });
          toast.success(`${product.name} added to cart`);
        });
      } else {
        toast.error('Product not found!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching product.');
    }
    
    setBarcode('');
  }
};

const handleNoSale = () => {
  // 1. Open cash drawer (hardware integration)
  // For now, simulate
  toast.info("No Sale: Cash drawer opened.");

  // 2. Optionally log in Firestore
  // await addDoc(collection(db, "nosales"), { timestamp: new Date(), user: currentUser })

  // 3. Ensure it's allowed when cart is empty
};

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
      <input
  ref={barcodeInputRef}
  type="text"
  value={barcode}
  onChange={(e) => setBarcode(e.target.value)}
  onKeyDown={handleScanSubmit}
  style={{ position: 'absolute', left:'-9999px' }}
  autoFocus
/>
      <Sidebar/>
      
      <div className="left-panel">
        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="category-buttons">
            {['All', 'Hookah & Accessories	', 'Delta-8 / THC / CBD	', 'Disposables','Others'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat) }
                className={selectedCategory === cat ? 'active' : ''}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
            
       <ProductGrid
  products={filteredProducts}
  onAddToCart={handleAddToCart}
  onHighGrocery={handleHighGrocery}
  onNoSale={handleNoSale}
  
/>
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
