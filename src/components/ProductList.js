import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  const startEdit = (product) => {
    setEditId(product.id);
    setEditData({ ...product });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    const productRef = doc(db, 'products', editId);
    try {
      await updateDoc(productRef, {
        ...editData,
        price: parseFloat(editData.price),
      });
      setEditId(null);
      setEditData({});
    } catch (err) {
      alert('Error updating product: ' + err.message);
    }
  };

  return (
    <div className="product-list">
      <h2>📦 Product Inventory</h2>
      {products.length === 0 ? (
        <p>No products yet...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Barcode</th>
              <th>Price</th>
              <th>Category</th>
              <th>Store</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                {editId === p.id ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="barcode"
                        value={editData.barcode}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        value={editData.price}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name="category"
                        value={editData.category}
                        onChange={handleChange}
                      >
                        <option value="Drinks">Drinks</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Food">Food</option>
                        <option value="Donations">Donations</option>
                      </select>
                    </td>
                    <td>{p.storeId}</td>
                    <td>
                      <button className="save-btn" onClick={saveEdit}>Save</button>
                      <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.name}</td>
                    <td>{p.barcode}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>{p.category}</td>
                    <td>{p.storeId}</td>
                    <td>
                      <button className="edit-btn" onClick={() => startEdit(p)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
