import { useState } from "react";
import "./Header.css";
import AddListingModal from "../AddListingModal/AddListingModal";

const Header: React.FC = () => {
  const [isAddOpen, setIsAddOpen] = useState(false); // State to track modal open/close
  return (
    <header className="header">
      <div className="header-left">
        {/* Add your logo here */}
        <h1 className="site-name">Nature Picture</h1>
      </div>
      <div className="header-right">
        <button
          className="add-listing-button"
          onClick={() => setIsAddOpen(true)}
        >
          Add Listing
        </button>
        <button className="buyer-button">Switch to Buyer</button>
      </div>
      <AddListingModal
        isOpen={isAddOpen}
        handleClose={() => setIsAddOpen(false)}
      >
        <h2 style={{ color: "black" }}>Add New Art Listing</h2>
      </AddListingModal>
    </header>
  );
};

export default Header;
