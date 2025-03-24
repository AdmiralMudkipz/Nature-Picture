// Import Link from react-router-dom - this is like a special <a> tag for React
import { Link } from 'react-router-dom';

// This is our navigation menu component
function Navbar() {
  return (
    <nav className="navbar">
      {/* Brand/Logo section */}
      <div className="navbar-brand">
        <Link to="/">Nature Picture</Link>
      </div>
      
      {/* Navigation links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar; 