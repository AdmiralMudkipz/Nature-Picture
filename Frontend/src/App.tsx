import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellerView from './pages/SellerView';
import SellerProfile from "./pages/SellerProfile"; // Import your SellerProfile
import Cart from './pages/Cart';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import BuyerView from './pages/BuyerView';

function App() {
  // This would typically come from your authentication system
  const [isAuthenticated] = useState(false ); 

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="page-content">
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Home />} />
            
            {/* Login route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route
              path="/seller"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SellerView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            {/* Add dynamic Seller Profile route */}
            <Route
              path="/seller/:sellerId"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SellerProfile />
                </ProtectedRoute>
              }
            />
            {/* seller profile route - need to get db connection working */}
            <Route path="/seller-profile" element={<SellerProfile />} /> 
            {/* buyer profile route - need to get db connection working */}
            <Route path="/buyer-profile" element={<BuyerView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
