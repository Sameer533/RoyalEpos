import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SalesScreen from './screens/SalesScreen';
import ProductAddForm from './components/ProductAddForm';
import ProductList from './components/ProductList';
import KeypadModal from './components/KeypadModal';
import Receipt from './components/Receipt';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Sales + Product Management */}
          <Route
            path="/"
            element={
              <>
                
                <SalesScreen />
              </>
            }
          />

          {/* Receipt page */}
          <Route path="/add" element={
            <>

            <ProductAddForm />
                <ProductList />
            </>
          } />
          <Route path="/receipt" element={<Receipt />} />

          {/* In future: Add Sales Report route here */}
          {/* <Route path="/sales-report" element={<SalesReport />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
