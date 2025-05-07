import { useState } from "react";
import styled from "styled-components";
import AddListingModal from "./AddListingModal";
import { SortDropdown } from "./SortDropdown";

const sortOptions = [
  { label: "Select Sort", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

interface ListingHeaderProps {
  title?: string;
  onSortChange?: (value: string) => void;
  showSort?: boolean;
  currentSort?: string;
  showAddButton?: boolean;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  onSortChange = () => {},
  showSort = true,
  currentSort = "",
  showAddButton = false,
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false); // State for modal visibility

  const handleAddListingClick = () => {
    setIsAddOpen(true);
  };

  const handleModalClose = () => {
    setIsAddOpen(false);
  };
  

  return (
    <ListingHeaderWrapper>
      <HeaderLeft>
        <Title>{title}</Title>
      </HeaderLeft>

      <HeaderRight>
        {showSort && (
          <SortWrapper>
            <SortDropdown
              options={sortOptions}
              onSortChange={onSortChange}
              value={currentSort}
              defaultValue={currentSort}
              className="w-48"
            />
          </SortWrapper>
        )}

        {showAddButton && (
          <Button onClick={handleAddListingClick}>Add Listing</Button>
        )}
      </HeaderRight>

      {showAddButton && (
        <AddListingModal isOpen={isAddOpen} handleClose={handleModalClose}>
          <h2>Add New Art Listing</h2>
        </AddListingModal>
      )}
    </ListingHeaderWrapper>
  );
};

const ListingHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin-right: 20px;
  font-size: 24px;
  font-weight: bold;
  color: rgb(255, 255, 255);
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const SortWrapper = styled.div`
  width: 200px; // Set fixed width for the sort dropdown if needed
  margin-right: 20px;
`;

const Button = styled.button`
  background-color: #2f4f4f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3b6e6b;
  }
`;

export default ListingHeader;
