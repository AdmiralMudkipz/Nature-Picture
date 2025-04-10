import React from 'react';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    alert(`You searched for: ${query}`);
  };
const handleCategoryChange = (categories: string[]) => {
    console.log('Selected Categories:', categories);
  };

  const handleCountyChange = (county: string) => {
    console.log('Selected County:', county);
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Explore Local Art</h1>
      <SearchBar onSearch={handleSearch} />
      <Sidebar onCategoryChange={handleCategoryChange} onCountyChange={handleCountyChange} />
    </div>
  );
};

export default Home;