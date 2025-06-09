import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';


const SalesReports = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, 'orders'));
      const data = snapshot.docs.map(doc => doc.data());
      setOrders(data);
      setFilteredOrders(data);
    };
    fetchOrders();
  }, []);

  const handleFilter = () => {
    let filtered = [...orders];

    if (paymentMethod !== 'All') {
      filtered = filtered.filter(order => order.paymentMethod === paymentMethod);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.timestamp?.seconds * 1000);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      });
    }

    setFilteredOrders(filtered);
  };

  // Totals
  const totalSales = filteredOrders.reduce((sum, o) => sum + o.total, 0);
  const cashSales = filteredOrders.filter(o => o.paymentMethod === 'Cash').reduce((sum, o) => sum + o.total, 0);
  const cardSales = filteredOrders.filter(o => o.paymentMethod === 'Card').reduce((sum, o) => sum + o.total, 0);
  const loyaltySales = filteredOrders.filter(o => o.paymentMethod === 'Loyalty').reduce((sum, o) => sum + o.total, 0);
  const orderCount = filteredOrders.length;

  const categoryTotals = {};
  filteredOrders.forEach(order => {
    order.items.forEach(item => {
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
      }
      categoryTotals[item.category] += item.price * item.quantity;
    });
  });

const exportToCSV = () => {
  const dataToExport = filteredOrders.map(order => ({
    Date: new Date(order.timestamp?.seconds * 1000).toLocaleString(),
    Total: order.total,
    Payment: order.paymentMethod,
    Items: order.items.map(i => `${i.name} x${i.quantity}`).join(', ')
  }));

  const csv = Papa.unparse(dataToExport);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'sales_report.csv');
};
const handlePrint = () => {
  const printWindow = window.open('', '_blank');
  const summary = `
    <h2>Sales Summary</h2>
    <p><strong>Total Sales:</strong> $${totalSales.toFixed(2)}</p>
    <p><strong>Number of Orders:</strong> ${orderCount}</p>
    <p><strong>Cash Sales:</strong> $${cashSales.toFixed(2)}</p>
    <p><strong>Card Sales:</strong> $${cardSales.toFixed(2)}</p>
    <p><strong>Loyalty Sales:</strong> $${loyaltySales.toFixed(2)}</p>
    <h3>Category-wise Sales</h3>
    <ul>
      ${Object.entries(categoryTotals).map(([cat, val]) => `<li>${cat}: $${val.toFixed(2)}</li>`).join('')}
    </ul>
  `;

  printWindow.document.write(`
    <html>
      <head>
        <title>Sales Summary</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h2, h3 { margin-bottom: 10px; }
          ul { list-style: none; padding: 0; }
        </style>
      </head>
      <body>${summary}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

  return (
    <div className="sales-report" style={{ padding: 20 }}>
      <h2>📊 Sales Reports</h2>

      <div style={{ marginBottom: 20 }}>
        <label>From: <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
        <label style={{ marginLeft: 10 }}>To: <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></label>
        <select onChange={e => setPaymentMethod(e.target.value)} value={paymentMethod} style={{ marginLeft: 10 }}>
          <option>All</option>
          <option>Cash</option>
          <option>Card</option>
          <option>Loyalty</option>
        </select>
        <button onClick={handleFilter} style={{ marginLeft: 10 }}>Filter</button>
        <div style={{ marginTop: '20px' }}>
  <button onClick={exportToCSV}>📤 Export to CSV</button>
  <button onClick={handlePrint} style={{ marginLeft: '10px' }}>🖨️ Print Summary</button>
</div>      
      </div>

      <hr />

      <h3>📈 Summary</h3>
      <p><strong>Total Sales:</strong> ${totalSales.toFixed(2)}</p>
      <p><strong>Number of Orders:</strong> {orderCount}</p>
      <p>💵 Cash: ${cashSales.toFixed(2)}</p>
      <p>💳 Card: ${cardSales.toFixed(2)}</p>
      <p>🎁 Loyalty: ${loyaltySales.toFixed(2)}</p>

      <h4>📦 Category Sales:</h4>
      <ul>
        {Object.entries(categoryTotals).map(([cat, val]) => (
          <li key={cat}>{cat}: ${val.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesReports;
