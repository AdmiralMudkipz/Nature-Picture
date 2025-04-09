import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from '../src/context/UserContext';  // Import UserProvider
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellerView from './pages/SellerView';
import SellerProfile from './pages/SellerProfile'; // Import your SellerProfile
import Cart from './pages/Cart';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import BuyerView from './pages/BuyerView';

function App() {
  // This would typically come from your authentication system
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Use state to manage login status

  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="page-content">
            <Routes>
              {/* Public route */}
              <Route path="/home" element={<Home />} />

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
              {/* Seller profile route */}
              <Route path="/seller-profile" element={<SellerProfile />} />
              {/* Buyer profile route */}
              <Route path="/buyer-profile" element={<BuyerView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
