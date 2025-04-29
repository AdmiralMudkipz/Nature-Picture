import React, { useState, CSSProperties, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom'; // Import for navigation

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultPath?: string; // Path to navigate to when query is empty
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, defaultPath = '/' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Function to sanitize input to prevent SQL injection 
  const sanitizeInput = (input: string): string => {
    // Basic sanitization: Remove SQL keywords and special characters
    return input
      .replace(/[;'"\\/]/g, '') // Remove common SQL injection characters
      .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|UNION|CREATE|WHERE|FROM|JOIN)\b/gi, '');
  };

  // Handle search submission
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    
    const sanitizedQuery = sanitizeInput(query.trim());
    
    // Always call onSearch - with empty string if cleared
    onSearch(sanitizedQuery);
    
    // If query is empty, also navigate to default path
    if (!sanitizedQuery) {
      navigate(defaultPath, { replace: true });
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
  };
  
  // Effect to watch for empty query and trigger reload
  useEffect(() => {
    // If user clears the input, reset the search
    if (query === '') {
      onSearch(''); // Call onSearch with empty string to reload all products
      
      // Only navigate if we're not already on the default path
      if (location.pathname !== defaultPath) {
        navigate(defaultPath, { replace: true });
      }
    }
  }, [query, navigate, defaultPath, location, onSearch]);


  return (
    <div style={styles.container}>
      <form onSubmit={handleSearch} style={styles.form}>
        <div style={styles.inputWrapper}>
          <FiSearch style={styles.icon} />
          <input
            type="text"
            style={styles.searchInput}
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

const styles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
    padding: '20px',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '30px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    outline: 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '20px',
    color: '#ffffff',
  },
};