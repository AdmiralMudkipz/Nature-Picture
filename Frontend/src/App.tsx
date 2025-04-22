import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellerProfile from './pages/SellerProfile';
import Cart from './pages/Cart';
import Login from './components/Login';
import SignUp from './pages/Sign-Up';
import ProtectedRoute from './components/ProtectedRoute';
import BuyerView from './pages/BuyerView';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  // This would typically come from your authentication system
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Use state to manage login status

  return (
    <ErrorBoundary>
      <UserProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Navbar /> {/* Navbar component shows up on every page */}
              <div className="page-content">
                <Routes>
                  {/* Public route */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />

                  {/* Login route */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected routes */}
                  {/* <Route
                    path="/seller"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        
                      </ProtectedRoute>
                    }
                  /> */}
                  <Route path="/cart" element={<Cart />} />
                  {/* Add dynamic Seller Profile route */}
                  {/* <Route
                    path="/seller/:sellerId"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <SellerProfile />
                      </ProtectedRoute>
                    }
                  /> */}
                  {/* Seller profile route */}
                  <Route
                    path="/seller-profile"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <SellerProfile />
                      </ProtectedRoute>
                    }
                  />
                  {/* Buyer profile route fix later */}
                  <Route
                    path="/buyer-profile"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <BuyerView />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/sign-up" element={<SignUp />} />
                   {/* widget test route for jenna */}
                  {/* <Route path="/widget-test" element={<WidgetTest />} /> */}
                  <Route path="*" element={<div>404 - Page Not Found</div>} />
                

                </Routes>
              </div>
            </div>
          </Router>
        </CartProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
