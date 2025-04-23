import { useState } from "react";
import styled from "styled-components";
import AddListingModal from "./AddListingModal"; // Assuming this is your modal component
import { SortDropdown } from "./SortDropdown"; // Assuming this is your sort dropdown component

const sortOptions = [
  { label: "Newest", value: "newest" }, // Need to delete this
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

interface ListingHeaderProps {
  onSortChange?: (value: string) => void;
  showSort?: boolean;
  currentSort?: string;
  showAddButton?: boolean; // ✅ Add this
}



const ListingHeader: React.FC<ListingHeaderProps> = ({
  onSortChange = () => {},
  showSort = true,
  currentSort = "",
  showAddButton = false, 
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false); // State for modal visibility

  const handleAddListingClick = () => {
    setIsAddOpen(true); // Open modal when "Add Listing" button is clicked
  };

  const handleModalClose = () => {
    setIsAddOpen(false); // Close modal when closing
  };

  return (
    <ListingHeaderWrapper>
      <HeaderLeft>
        <Title>Listings</Title>
      </HeaderLeft>

      <HeaderRight>
        {showSort && (
          <SortWrapper>
            <SortDropdown
              options={sortOptions}
              onSortChange={onSortChange}
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
          {/* Your modal form or content here */}
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
