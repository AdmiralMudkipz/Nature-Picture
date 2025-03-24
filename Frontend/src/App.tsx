import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellerView from './pages/SellerView';
import Cart from './pages/Cart';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // This would typically come from your authentication system
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
