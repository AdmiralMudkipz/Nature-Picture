import React, { useState } from 'react';
import { FaFilter, FaMugHot, FaCamera, FaPrint, FaCube, FaPalette, FaEllipsisH } from 'react-icons/fa';
import styled from 'styled-components';

const categories = [
  { name: 'Photography', icon: <FaCamera /> },
  { name: 'Print', icon: <FaPrint /> },
  { name: 'Sculpture', icon: <FaCube /> },
  { name: 'Painting', icon: <FaPalette /> },
  { name: 'Ceramics', icon: <FaMugHot /> },
  { name: 'Other', icon: <FaEllipsisH /> },
];

const counties = [
  'Atlantic', 'Bergen', 'Burlington', 'Camden', 'Cape May', 'Cumberland', 'Essex',
  'Gloucester', 'Hudson', 'Hunterdon', 'Mercer', 'Middlesex', 'Monmouth', 'Morris',
  'Ocean', 'Passaic', 'Salem', 'Somerset', 'Sussex', 'Union', 'Warren',
];

interface SidebarProps {
  onCategoryChange: (selectedCategories: string[]) => void;
  onCountyChange: (selectedCounty: string) => void;
  onSidebarToggle?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, onCountyChange, onSidebarToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState('');

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
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
    const county = event.target.value;
    setSelectedCounty(county);
    onCountyChange(county);
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
          <Label htmlFor="county">Select County:</Label>
          <Select
            id="county"
            value={selectedCounty}
            onChange={handleCountyChange}
          >
            <option value="">Select a county...</option>
            {counties.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </Select>
        </DropdownSection>
      </SidebarContent>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: relative;
`;

const FilterButton = styled.button<{ isOpen: boolean }>`
  position: fixed;
  top: 100px;
  left: ${({ isOpen }) => (isOpen ? '300px' : '20px')};
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
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
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
    border-color: #4CAF50;
  }

  option {
    background: #2c2c2c;
  }
`;

export default Sidebar;
