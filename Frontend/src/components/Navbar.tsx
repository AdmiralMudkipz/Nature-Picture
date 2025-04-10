// Import necessary components and hooks
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const Navbar = () => {
  const { user } = useUser(); // access the user data from the context

  return (
    <nav className="navbar">
      {/* Brand/Logo section */}
      <div className="navbar-brand">
        <Link to="/Home">Nature Picture</Link>
      </div>
      
      {/* Navigation links */}
      <div className="navbar-links">
        {user ? (
          // if the user is logged in, show "Hi, [username]". when they click on this they'll be 
          // able to go to their buyer profile page & see past orders.
          <Link to="/buyer-profile">Hi, {user.username}</Link>
        ) : (
          // if no user is logged in, show "Log In"
          <Link to="/">Log In</Link>
        )}

        <Link to="/SellerView">Seller View</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
