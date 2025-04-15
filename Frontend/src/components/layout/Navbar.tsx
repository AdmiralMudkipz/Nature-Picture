// Import necessary components and hooks
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FaUser, FaStore, FaShoppingCart } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { user } = useUser();

  return (
    <NavbarContainer>
      <NavSection>
        {user ? (
          <NavLink to="/buyer-profile">
            <FaUser />
            <span>Hi, {user.username}</span>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <FaUser />
            <span>Log In</span>
          </NavLink>
        )}
      </NavSection>

      <LogoSection>
        <Link to="/Home">
          <LogoImage src={logo} alt="Nature Picture Logo" />
        </Link>
      </LogoSection>

      <NavSection>
        <NavLink to="/seller-profile">
          <FaStore />
          <span>Seller</span>
        </NavLink>
        <NavLink to="/cart">
          <FaShoppingCart />
          <span>Cart</span>
        </NavLink>
      </NavSection>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1c1c1c;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;

  &:last-child {
    justify-content: flex-end;
  }
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  position: relative;
  z-index: 1001;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
  }

  svg {
    font-size: 1.2rem;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export default Navbar;
