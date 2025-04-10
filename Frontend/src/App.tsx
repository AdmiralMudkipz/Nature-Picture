import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from '../src/context/UserContext';  // Import UserProvider
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SellerProfile from './pages/SellerProfile'; // Import your SellerProfile
import Cart from './pages/Cart';
import Login from './components/Login';
import SignUp from './pages/Sign-Up'; // Import your SignUp component
import ProtectedRoute from './components/ProtectedRoute';
import BuyerView from './pages/BuyerView';
import WidgetTest from './pages/WidgetTest';

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
              {/* <Route
                path="/seller"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    
                  </ProtectedRoute>
                }
              /> */}
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
              <Route path='/sign-up' element={<SignUp />} />
              <Route path="/widget-test" element={<WidgetTest />} />
              {/* widget test route for jenna */}
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
