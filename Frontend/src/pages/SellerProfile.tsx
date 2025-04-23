import React, { useState, useEffect } from "react";
import SellerInfo from "../components/SellerProfileInfo/SellerInfo";
import ListingHeader from "../components/SellerProfileInfo/ListingHeader";
import ListingWidget from "../components/modalstuff/ListingWidget";
import ListingModal from "../components/modalstuff/Modal"; // assuming this is your modal
import { useUser } from "../context/UserContext";
import axios from "axios";
import styled from 'styled-components';

// This is the seller profile page that is being used

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  date: string;
  stock_amount: number;
}

const SellerPage: React.FC = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("newest");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("SellerProfile: user =", user);
    console.log("SellerProfile: user.user_id =", user?.user_id);

    const fetchSellerProducts = async () => {
      if (!user?.user_id) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/base/artpieces/${user.user_id}/art/`
        );
        const allProducts = response.data;

        const formatted = allProducts.map((item: any) => ({
          id: item.art_id,
          name: item.name,
          image: item.image,
          price: item.price !== null ? parseFloat(String(item.price)) : 0,
          date: item.date_created || "2025-04-01",
          stock_amount: item.stock_amount,
        }));

        setProducts(formatted);
        console.log("PRODUCT:", formatted);
      } catch (err) {
        console.error("Error fetching seller products:", err);
      }
    };

    fetchSellerProducts();
  }, [user]);

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      switch (sortMethod) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    setProducts(sorted);
  }, [sortMethod]);

  const handleWidgetClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <SellerContainer>
    <div className="seller-profile">
      <div className="seller-content">
        <SellerInfo />
      </div>

      <div className="listing-header-container">
        <ListingHeader
          onSortChange={setSortMethod}
          currentSort={sortMethod}
          showSort={true}
          showAddButton={true} 
        />
      </div>

      <div
        className="product-card-wrapper"
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
      >
        <ProductGrid>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleWidgetClick(product)}
            style={{ cursor: "pointer" }}
          >
            <ListingWidget
              id={product.id.toString()}
              image={product.image}
              title={product.name}
              artist={user?.username || "Unknown Artist"}
              price={Number(product.price)} // Ensure price is a number
              sellerEmail={user?.email || "Unknown Email"}
              soldOut={product.stock_amount === 0}
            />
          </div>
      
        ))}
        </ProductGrid>
      </div>

      {isModalOpen && selectedProduct && (
        <ListingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={{
            id: selectedProduct.id,
            title: selectedProduct.name,
            image: selectedProduct.image,
            price: selectedProduct.price,
            artist: user?.username || "Unknown Artist",
            sellerEmail: user?.email || "Unknown Email",
          }}
        />
      )}
    </div>
    </SellerContainer>
  );
};

const SellerContainer = styled.div`
  padding: 2rem;
  background-color: #1c1c1c;
  min-height: 100vh;
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center; /* Even spacing and center-aligned */
  margin-top: 2rem;
`;
export default SellerPage;
