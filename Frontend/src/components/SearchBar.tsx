import React, { useState, CSSProperties } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  const styles: Record<string, CSSProperties> = {
    container: {
      width: '100%',
      padding: '20px',
      backgroundColor: 'transparent', // Fully transparent background
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
      padding: '10px 40px', // Space for the icon
      fontSize: '16px',
      border: 'none', // No border
      borderRadius: '30px',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle transparency for blending
      color: '#ffffff', // Matches light text on dark backgrounds
      outline: 'none',
      transition: 'background-color 0.3s, box-shadow 0.3s',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Subtle shadow for visibility
    },
    icon: {
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: '#ffffff', // White icon for dark backgrounds
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSearch} style={styles.form}>
        <div style={styles.inputWrapper}>
          <FiSearch style={styles.icon} />
          <input
            type="text"
            style={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            required
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
