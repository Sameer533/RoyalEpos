import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Receipt = () => {
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, orderBy("timestamp", "desc"), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setLatestOrder(snapshot.docs[0].data());
      }
    };

    fetchLatestOrder();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!latestOrder) return <p>Loading latest receipt...</p>;

  return (
    <div className="receipt-container" style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc" }}>
      <h2>🧾 Receipt</h2>
      <p><strong>Store:</strong> {latestOrder.storeId}</p>
      <p><strong>Payment:</strong> {latestOrder.paymentMethod}</p>
      <p><strong>Date:</strong> {new Date().toLocaleString()}</p>

      <hr />
      {latestOrder.items.map((item, index) => (
        <div key={index}>
          {item.name} x{item.quantity} = ${(item.quantity * item.price).toFixed(2)}
        </div>
      ))}
      <hr />
      <p>Subtotal: ${latestOrder.subtotal.toFixed(2)}</p>
      <p>Tax: ${latestOrder.tax.toFixed(2)}</p>
      <h3>Total: ${latestOrder.total.toFixed(2)}</h3>

      <button onClick={handlePrint} style={{ marginTop: 20 }}>🖨️ Print Receipt</button>
    </div>
  );
};

export default Receipt;
