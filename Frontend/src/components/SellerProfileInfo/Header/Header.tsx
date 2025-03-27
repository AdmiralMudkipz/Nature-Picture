import leafImage from "../leaf.jpg";  
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
      <img src={leafImage} alt="Nature Picture" className="logo" />
        <h1 className="site-name">Nature Picture</h1>
      </div>
      <button className="header-button">Switch to Buyer</button>
    </header>
  );
};

export default Header;
