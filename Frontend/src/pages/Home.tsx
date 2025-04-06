import React from 'react';
import SearchBar from '../components/SearchBar';

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    alert(`You searched for: ${query}`);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Explore Local Art</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default App;
