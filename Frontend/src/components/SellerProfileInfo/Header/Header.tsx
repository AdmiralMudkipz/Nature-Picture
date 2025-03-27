 
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
      {/* need to add the image logo here */}
        <h1 className="site-name">Nature Picture</h1>
      </div>
      <button className="header-button">Switch to Buyer</button>
    </header>
  );
};

export default Header;
