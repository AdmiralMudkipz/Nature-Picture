import React, { useState, useEffect } from "react";
import {
  FaFilter,
  FaMugHot,
  FaCamera,
  FaPrint,
  FaCube,
  FaPalette,
  FaEllipsisH,
} from "react-icons/fa";
import styled from "styled-components";
import axios from "axios"; // Import axios for fetching data

interface Category {
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { name: "Photography", icon: <FaCamera /> },
  { name: "Print", icon: <FaPrint /> },
  { name: "Sculpture", icon: <FaCube /> },
  { name: "Painting", icon: <FaPalette /> },
  { name: "Ceramics", icon: <FaMugHot /> },
  { name: "Other", icon: <FaEllipsisH /> },
];

interface Location {
  location_id: number;
  county: string;
  state: string;
}

interface SidebarProps {
  onCategoryChange: (selectedCategories: string[]) => void;
  onCountyChange: (selectedCountyId: string) => void; // Expecting a string ID now
  onSidebarToggle?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onCategoryChange,
  onCountyChange,
  onSidebarToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountyId, setSelectedCountyId] = useState("");
  const [locations, setLocations] = useState<Location[]>([]); // Use 'locations'
  const [loadingLocations, setLoadingLocations] = useState(true); // Use 'loadingLocations'
  const [locationError, setLocationError] = useState<string | null>(null); // Use 'locationError'

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get<Location[]>(
          "http://127.0.0.1:8000/base/artpieces/locations/"
        );
        setLocations(response.data);
        setLoadingLocations(false);
      } catch (error: any) {
        console.error("Error fetching locations:", error);
        setLocationError("Failed to fetch locations.");
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

 


  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    console.log("Sidebar state changing to:", newIsOpen);
    setIsOpen(newIsOpen);
    onSidebarToggle?.(newIsOpen);
  };

  const handleCheckboxChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handleCountyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countyId = event.target.value;
    setSelectedCountyId(countyId);
    onCountyChange(countyId); // Pass the ID
  };

  const handleCategoryChange = (categories: string[]) => {
    const categoryFilter = categories.join(','); // e.g., "Print,Photography"
    fetchArtPieces(categoryFilter, selectedCounty); // or however you're fetching
  };

  return (
    <SidebarContainer>
      <FilterButton isOpen={isOpen} onClick={toggleSidebar}>
        <FaFilter />
      </FilterButton>

      <SidebarContent isOpen={isOpen}>
        <Title>Filters</Title>
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem key={category.name}>
              <Label>
                <IconWrapper>{category.icon}</IconWrapper>
                <Checkbox
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCheckboxChange(category.name)}
                />
                <span>{category.name}</span>
              </Label>
            </CategoryItem>
          ))}
        </CategoryList>

        <DropdownSection>
          <Label htmlFor="county">Select Location:</Label>
          {loadingLocations ? (
            <div>Loading locations...</div>
          ) : locationError ? (
            <div>Error loading locations: {locationError}</div>
          ) : (
            <Select
              id="county"
              value={selectedCountyId}
              onChange={handleCountyChange}
            >
              <option value="">Select a location...</option>
              {locations.map((location) => (
                <option
                  key={location.location_id}
                  value={String(location.location_id)}
                >
                  {location.county}, {location.state}
                </option>
              ))}
            </Select>
          )}
        </DropdownSection>
      </SidebarContent>
    </SidebarContainer>
  );
};

// Styled components remain the same

export default Sidebar;

const SidebarContainer = styled.div`
  position: relative;
`;

const FilterButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  top: 100px;
  left: ${({ isOpen }) => (isOpen ? "300px" : "20px")};
  z-index: 1001;
  padding: 12px;
  font-size: 24px;
  cursor: pointer;
  background-color: #2c2c2c;
  border: none;
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #3c3c3c;
    transform: scale(1.1);
  }
`;

const SidebarContent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: linear-gradient(to right, #1c1c1c, #2c2c2c);
  color: white;
  padding: 80px 30px 30px;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  border-bottom: 1px solid #444;
  padding-bottom: 15px;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  gap: 15px;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
  width: 24px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const DropdownSection = styled.div`
  margin-top: 30px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #444;
  background: #2c2c2c;
  color: white;
  margin-top: 10px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }

  option {
    background: #2c2c2c;
  }
`;
