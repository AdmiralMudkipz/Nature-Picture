import { useState } from "react";
import styled from "styled-components";
import AddListingModal from "./AddListingModal";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #2f4f4f;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const SiteName = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #7aef56;
  }
`;

const Header: React.FC = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <SiteName>Nature Picture</SiteName>
      </HeaderLeft>
      <HeaderRight>
        <Button onClick={() => setIsAddOpen(true)}>Add Listing</Button>
        <Button>Switch to Buyer</Button>
      </HeaderRight>

      <AddListingModal
        isOpen={isAddOpen}
        handleClose={() => setIsAddOpen(false)}
      >
        <h2 style={{ color: "black" }}>Add New Art Listing</h2>
      </AddListingModal>
    </HeaderContainer>
  );
};

export default Header;
