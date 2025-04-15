import React, { useState } from 'react';
import styled from 'styled-components';
import Widget from '../components/modalstuff/ListingWidget';
import Modal from '../components/modalstuff/Modal';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import leafPainting from '../assets/leaf painting.jpg';
import handmadeVase from '../assets/vase.jpg';
import woodCarving from '../assets/wood carving.jpg';

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleCategoryChange = (categories: string[]) => {
    console.log('Selected Categories:', categories);
  };

  const handleCountyChange = (county: string) => {
    console.log('Selected County:', county);
  };

  const products = [
    {
      id: '1',
      images: [leafPainting],
      title: 'Leaf Painting',
      artist: 'ArtByEmily',
      price: 20.0,
      typeOfArt: 'Painting',
      bio: 'A vibrant painting of a leaf.',
      sellerEmail: 'emily@example.com'
    },
    {
      id: '2',
      images: [handmadeVase],
      title: 'Handmade Vase',
      artist: 'JohnDoe',
      price: 40.0,
      typeOfArt: 'Pottery',
      bio: 'An elegant handmade vase.',
      sellerEmail: 'john@example.com'
    },
    {
      id: '3',
      images: [woodCarving],
      title: 'Wood Carving',
      artist: 'CraftsmanJoe',
      price: 60.0,
      typeOfArt: 'Woodwork',
      bio: 'A beautiful wooden sculpture.',
      sellerEmail: 'joe@example.com'
    },
  ];

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      alert(`Added ${selectedProduct.title} to your cart!`);
    }
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <HomeContainer>
      <Header>Explore Local Art</Header>
      <SearchBar onSearch={handleSearch} />
      <ContentWrapper>
        <Sidebar 
          onCategoryChange={handleCategoryChange} 
          onCountyChange={handleCountyChange}
          onSidebarToggle={handleSidebarToggle}
        />
        <WidgetGrid $isSidebarOpen={isSidebarOpen}>
          {products.map((product) => (
            <WidgetWrapper key={product.id} onClick={() => openModal(product)}>
              <Widget
                image={product.images[0]}
                title={product.title}
                artist={product.artist}
                price={product.price}
                isLandscape={true}
                sellerEmail={product.sellerEmail}
                id={product.id}
              />
            </WidgetWrapper>
          ))}
        </WidgetGrid>
      </ContentWrapper>
      {isModalOpen && selectedProduct && (
        <Modal
          images={selectedProduct.images}
          title={selectedProduct.title}
          artist={selectedProduct.artist}
          price={selectedProduct.price}
          typeOfArt={selectedProduct.typeOfArt}
          bio={selectedProduct.bio}
          onClose={closeModal}
          sellerEmail={selectedProduct.sellerEmail}
          id={selectedProduct.id}
        />
      )}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: #1c1c1c;
  color: #ffffff;
  min-height: 100vh;
  padding: 90px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 36px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  position: relative;
  margin: 0 auto;
  padding: 20px;
`;

const WidgetGrid = styled.div<{ $isSidebarOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  transition: filter 0.3s ease;
  filter: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'blur(2px)' : 'none')};
  pointer-events: ${({ $isSidebarOpen }) => ($isSidebarOpen ? 'none' : 'auto')};
`;

const WidgetWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export default Home;
