// Import Link from react-router-dom - this is like a special <a> tag for React
import { Link } from 'react-router-dom';

// This is our navigation menu component
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Brand/Logo section */}
      <div className="navbar-brand">
        <Link to="/">Nature Picture</Link>
      </div>
      
      {/* Navigation links */}
      <div className="navbar-links">
        <Link to="/">Profile</Link>
        <Link to="/seller">Seller View</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar; 