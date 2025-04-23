import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Widget from "../components/modalstuff/ListingWidget";
import Modal from "../components/modalstuff/Modal";
import { useUser } from "../context/UserContext";
import ListingHeader from "../components/SellerProfileInfo/ListingHeader";

interface Product {
  id: string;
  images: string[];
  title: string;
  artist: string;
  price?: number | null;
  typeOfArt?: string;
  bio?: string;
  stock?: number;
  date: string;
}

const BuyerView: React.FC = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<string>("");

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.user_id) return;
      try {
        const response = await axios.get(
          "http://localhost:8000/base/purchase_order/purchase-history/",
          { withCredentials: true }
        );

        const formatted: Product[] = [];
        response.data.forEach((order: any) => {
          order.art_pieces.forEach((item: any) => {
            const art = item.art;
            formatted.push({
              id: art.art_id.toString(),
              images: art.image ? [art.image] : [],
              title: art.name,
              artist: art.user_name,
              price: item.price !== null ? parseFloat(String(item.price)) : 0,
              typeOfArt: art.type_of_art,
              bio: art.description,
              stock: art.stock_amount,
              date: order.date_purchased || "2025-04-01",
            });
          });
        });

        setProducts(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching past purchases:", err);
        setError("Failed to fetch purchase history.");
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const sortProducts = (products: Product[]) => {
    switch (sortMethod) {
      case "price-asc":
        return [...products].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price-desc":
        return [...products].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "name-asc":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  if (loading) return <div>Loading past purchases...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BuyerContainer>
      <Header>Your Past Purchases</Header>

      <div className="listing-header-container">
        <ListingHeader
          onSortChange={(value: string) => setSortMethod(value)}
          currentSort={sortMethod}
          showSort={true}
          showAddButton={false} // ✅ make sure it's false for buyers
        />
      </div>

      <WidgetGrid>
        {sortProducts(products).map((product) => (
          <WidgetWrapper key={product.id} onClick={() => openModal(product)}>
            <Widget
              image={product.images[0] || ""}
              title={product.title}
              artist={user?.username || "Unknown Artist"}
              price={product.price}
              id={product.id}
              typeOfArt={product.typeOfArt}
              stock={product.stock}
            />
          </WidgetWrapper>
        ))}
      </WidgetGrid>

      {isModalOpen && selectedProduct && (
        <Modal
          images={selectedProduct.images}
          title={selectedProduct.title}
          artist={selectedProduct.artist}
          price={selectedProduct.price}
          typeOfArt={selectedProduct.typeOfArt || ""}
          bio={selectedProduct.bio || ""}
          stock={selectedProduct.stock || 0}
          onClose={closeModal}
        />
      )}
    </BuyerContainer>
  );
};

export default BuyerView;

// Styled Components
const BuyerContainer = styled.div`
  padding: 2rem;
  background-color: #1c1c1c;
  min-height: 100vh;
`;

const Header = styled.h1`
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const WidgetWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;
