import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Widget from '../components/modalstuff/ListingWidget';
import Modal from '../components/modalstuff/Modal';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import { useCart } from '../context/CartContext';
// Remove the hardcoded image imports
// import leafPainting from '../assets/leaf painting.jpg';
// import handmadeVase from '../assets/vase.jpg';
// import woodCarving from '../assets/wood carving.jpg';

interface Product {
  art_id: number;
  type_of_art: string;
  name: string;
  description?: string | null;
  image?: string | null;
  stock_amount: number;
  price?: number | null;
  location: number; 
  user: number; 
}

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://127.0.0.1:8000/base/artpieces/');
        console.log('Fetched products:', response.data);
  
        // Map the fetched products correctly
        const formattedProducts = response.data.map((item) => ({
          id: String(item.art_id), // Ensure this is a string (important for React keys)
          images: item.image ? [item.image] : [], // Use an empty array if no image is provided
          title: item.name,
          artist: `User ID: ${item.user}`, // Assuming user ID is used as the artist name
          price: item.price !== null ? parseFloat(String(item.price)) : 0, // Parse price if it's not null
          typeOfArt: item.type_of_art,
          bio: item.description || '', // Handle null descriptions
          sellerEmail: `user_${item.user}@example.com`, // Placeholder email for the artist
        }));
  
        setProducts(formattedProducts); // Set the formatted products to the state
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please check your network and the API.');
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleCategoryChange = (categories: string[]) => {
    console.log('Selected Categories:', categories);
  };

  const handleCountyChange = (county: string) => {
    console.log('Selected County:', county);
  };

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
      addToCart({
        id: selectedProduct.id,
        title: selectedProduct.title,
        artist: selectedProduct.artist,
        price: selectedProduct.price,
        image: selectedProduct.images[0] || '', // Handle potential empty array
        sellerEmail: selectedProduct.sellerEmail
      });
      alert(`Added ${selectedProduct.title} to your cart!`);
      closeModal();
    }
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  if (loading) {
    return <div>Loading art listings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                image={product.images[0] || ''}
                title={product.title}
                artist={product.artist}
                price={product.price}
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
          onAddToCart={handleAddToCart}
        />
      )}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding: 2rem;
  background-color: #1c1c1c;
  min-height: 100vh;
`;

const Header = styled.h1`
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const WidgetGrid = styled.div<{ $isSidebarOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  flex: 1;
  filter: ${({ $isSidebarOpen }) => $isSidebarOpen ? 'blur(2px)' : 'none'};
  pointer-events: ${({ $isSidebarOpen }) => $isSidebarOpen ? 'none' : 'auto'};
`;

const WidgetWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export default Home;