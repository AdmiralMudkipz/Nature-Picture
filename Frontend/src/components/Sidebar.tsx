import React, { useState } from 'react';
import { FaFilter, FaMugHot,FaCamera, FaPrint, FaCube, FaPalette, FaEllipsisH, } from 'react-icons/fa'; // Using a filter icon for toggle button

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
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange, onCountyChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
    <div>
      {/* Sidebar toggle button */}
      <button
        style={{
          ...styles.arrowButton,
          left: isOpen ? '300px' : '20px', // Moves with the sidebar
        }}
        onClick={toggleSidebar}
        className="sidebar-toggle-button"
      >
        <FaFilter style={{ fontSize: '24px' }} /> {/* Filter icon instead of arrow */}
      </button>
      {/* Sidebar container */}
      <div
        style={{
          ...styles.sidebar,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <h3 style={styles.title}>Filters</h3>
        <ul style={styles.list}>
          {categories.map((category) => (
            <li key={category.name} style={styles.listItem}>
              <label style={styles.label}>
                {category.icon}
                <input
                  type="checkbox"
                  value={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCheckboxChange(category.name)}
                  style={styles.checkbox}
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
        <div style={styles.dropdown}>
          <label htmlFor="county" style={styles.label}>Select County:</label>
          <select id="county" value={selectedCounty} onChange={handleCountyChange} style={styles.select}>
            <option value="">Select a county...</option>
            {counties.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const styles = {
 arrowButton: {
    position: 'absolute' as const,
    top: '80px', // Aligned with the "Explore Local Art" header
    zIndex: 1000,
    padding: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: 'transparent', // Transparent button
    border: 'none',
    color: '#fff',
    transition: 'left 0.3s ease, color 0.3s ease', // Smooth transitions
 }, 
  sidebar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '300px',
    height: '100%',
    background: 'linear-gradient(to right, #1c1c1c, #2c2c2c)', // Subtle gradient background
    color: '#fff',
    padding: '30px', // Added more padding for "free" layout
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    transition: 'transform 0.3s ease-in-out',
    overflowY: 'auto' as const,
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '1px solid #444',
    paddingBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '20px', // Increased spacing
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px', // Slightly larger font for better readability
    cursor: 'pointer',
    gap: '15px', // Spacing between icons and text
  },
  checkbox: {
    marginRight: '10px',
  },
  dropdown: {
    marginTop: '30px', // Added more spacing
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    background: '#2c2c2c',
    color: '#fff',
  },
};

export default Sidebar;
