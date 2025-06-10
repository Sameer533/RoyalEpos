import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SalesScreen from "./screens/SalesScreen";
import ProductAddForm from "./components/ProductAddForm";
import ProductList from "./components/ProductList";
import KeypadModal from "./components/KeypadModal";
import Receipt from "./components/Receipt";
import SalesReports from "./components/SalesReports";

function App() {
  return (
    <Router>
      <div className="App">
              <ToastContainer position="top-center" autoClose={2000} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SalesScreen />
              </>
            }
          />

          {/* Receipt page */}
          <Route
            path="/add"
            element={
              <>
                <ProductAddForm />
                <ProductList />
              </>
            }
          />
          <Route path="/receipt" element={<Receipt />} />

          <Route path="/sales-report" element={<SalesReports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
