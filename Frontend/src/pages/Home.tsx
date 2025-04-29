import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Widget from "../components/modalstuff/ListingWidget";
import Modal from "../components/modalstuff/Modal";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import { useCart } from "../context/CartContext";

interface Product {
  art_id: number;
  type_of_art: string;
  name: string;
  description?: string | null;
  image?: string | null;
  stock_amount: number;
  price?: number | null;
  location: {
    location_id: number;
    county: string;
    state: string;
  };
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    email?: string;
  };
}

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
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
          // Debug log first item
          console.log("First item image:", response.data[0].image);
          console.log("First item image_url:", response.data[0].image_url);
        }
  
        const formattedProducts = response.data.map((item: any) => {
          // Debug log each item's image fields
          console.log(`Item ${item.art_id} image fields:`, {
            image: item.image,
            image_url: item.image_url
          });
          
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
            sellerEmail: item.user?.email || `user_${item.user_id}@example.com`,
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
        // product.artist.toLowerCase().includes(searchQuery.toLowerCase()) || backend only accounts for title & description
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

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct.stock === 0) {
      alert("This item is sold out and cannot be added to the cart.");
      return;
    }
    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id,
        title: selectedProduct.title,
        artist: selectedProduct.artist,
        price: selectedProduct.price,
        image: selectedProduct.images[0] || "",
        sellerEmail: selectedProduct.sellerEmail,
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
          {filteredProducts.map((product) => (
            <WidgetWrapper key={product.id} onClick={() => openModal(product)}>
              <Widget
                image={product.images[0] || ""}
                title={product.title}
                artist={product.artist}
                price={product.price}
                sellerEmail={product.sellerEmail}
                typeOfArt={product.typeOfArt}
                stock={product.stock}
                id={product.id}
                soldOut={product.stock === 0}
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
          stock={selectedProduct.stock}
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

export default Home;
