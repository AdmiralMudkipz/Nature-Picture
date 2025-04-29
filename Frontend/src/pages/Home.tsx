// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Widget from "../components/modalstuff/ListingWidget";
import Modal from "../components/modalstuff/Modal";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

interface Product {
  id: string;
  images: string[];
  title: string;
  artist: string;
  price: number;
  typeOfArt: string;
  bio: string;
  sellerEmail: string;
  sellerId: string; // Add sellerId field
  location: string;
  stock: number;
}

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addToCart, error: cartError } = useCart();
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/base/artpieces/");
        console.log("Raw API response:", response.data);
        
        if (response.data.length > 0) {
          console.log("First item image:", response.data[0].image);
          console.log("First item image_url:", response.data[0].image_url);
        }
  
        const formattedProducts = response.data.map((item: any) => {
          return {
            id: String(item.art_id),
            // Try image_url first, then fall back to image
            images: item.image_url ? [item.image_url] : 
                   (item.image ? [item.image] : []),
            title: item.name,
            artist: `${item.user.first_name} ${item.user.last_name}`,
            price: item.price !== null ? parseFloat(String(item.price)) : 0,
            typeOfArt: item.type_of_art,
            bio: item.description || "",
            sellerEmail: item.user?.email || `user_${item.user.user_id}@example.com`,
            sellerId: String(item.user.user_id), // Add the seller's user_id
            location: String(item.location.location_id),
            stock: item.stock_amount,
          };
        });
  
        setProducts(formattedProducts);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please check your network and the API.");
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const filterProducts = () => {
    return products.filter((product) => {
      const isCategoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.typeOfArt);
  
      const isCountyMatch =
        !selectedCounty || String(product.location) === selectedCounty;
  
      const isSearchMatch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.typeOfArt.toLowerCase().includes(searchQuery.toLowerCase());
  
      return isCategoryMatch && isCountyMatch && isSearchMatch;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleCountyChange = (locationId: string) => {
    setSelectedCounty(locationId);
  };

  const filteredProducts = filterProducts();

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    // Check if user is trying to purchase their own art
    if (user && selectedProduct.sellerId === user.user_id.toString()) {
      alert("You cannot purchase your own artwork");
      return;
    }
    
    if (selectedProduct.stock === 0) {
      alert("This item is sold out and cannot be added to the cart.");
      return;
    }
    
    addToCart({
      id: selectedProduct.id,
      title: selectedProduct.title,
      artist: selectedProduct.artist,
      price: selectedProduct.price,
      image: selectedProduct.images[0] || "",
      sellerEmail: selectedProduct.sellerEmail,
      sellerId: selectedProduct.sellerId
    });
    
    if (!cartError) {
      alert(`Added ${selectedProduct.title} to your cart!`);
      closeModal();
    }
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  if (loading) {
    return <LoadingContainer>Loading art listings...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>Error: {error}</ErrorContainer>;
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <WidgetWrapper key={product.id} onClick={() => openModal(product)}>
                <Widget
                  image={product.images[0] || ""}
                  title={product.title}
                  artist={product.artist}
                  price={product.price}
                  sellerEmail={product.sellerEmail}
                  sellerId={product.sellerId}
                  id={product.id}
                  soldOut={product.stock === 0}
                />
              </WidgetWrapper>
            ))
          ) : (
            <NoResultsMessage>
              No art pieces match your search criteria. Try adjusting your filters.
            </NoResultsMessage>
          )}
        </WidgetGrid>
      </ContentWrapper>
      {isModalOpen && selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          images={selectedProduct.images}
          title={selectedProduct.title}
          artist={selectedProduct.artist}
          price={selectedProduct.price}
          typeOfArt={selectedProduct.typeOfArt}
          bio={selectedProduct.bio}
          stock={selectedProduct.stock}
          sellerId={selectedProduct.sellerId}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </HomeContainer>
  );
};

// Styled components
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
  filter: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "blur(2px)" : "none")};
  pointer-events: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "none" : "auto")};
`;

const WidgetWrapper = styled.div`
  cursor: pointer;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1c1c1c;
  color: #ffffff;
  font-size: 1.5rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1c1c1c;
  color: #ff4d4f;
  font-size: 1.5rem;
  padding: 2rem;
  text-align: center;
`;

const NoResultsMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  background-color: #2c2c2c;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1.2rem;
`;

export default Home;