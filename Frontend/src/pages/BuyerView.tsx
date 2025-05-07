import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ListingWidget from "../components/modalstuff/ListingWidget";
import ListingModal from "../components/modalstuff/Modal";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import ListingHeader from "../components/SellerProfileInfo/ListingHeader";
import SellerInfo from "../components/SellerProfileInfo/SellerInfo";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  date: string;
  stock_amount: number;
}

const BuyerView: React.FC = () => {
  const { user } = useUser();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.user_id) return;
      try {
        const response = await axios.get(
          "http://localhost:8000/base/purchase_order/purchase-history/",
          { withCredentials: true }
        );

        console.log("Raw API response:", response.data);

        const formatted: Product[] = [];
        response.data.forEach((order: any) => {
          order.art_pieces.forEach((item: any) => {
            const art = item.art;

            // Simplify price extraction to just one consistent approach
            let price = 0;
            if (item.price && !isNaN(parseFloat(item.price))) {
              price = parseFloat(item.price);
            } else if (art.price && !isNaN(parseFloat(art.price))) {
              price = parseFloat(art.price);
            }

            console.log(`Art piece ${art.name} price:`, price);

            formatted.push({
              id: art.art_id,
              name: art.name,
              image: art.image || "",
              price: price, // Use the extracted price
              date: order.date_purchased || "2025-04-01",
              stock_amount: art.stock_amount || 0,
            });
          });
        });

        console.log("Final formatted purchase data:", formatted);
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

  // Only sort when sortMethod changes
  useEffect(() => {
    if (products.length > 0 && sortMethod) {
      const productsCopy = [...products];
      const sorted = productsCopy.sort((a, b) => {
        switch (sortMethod) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
      setProducts(sorted);
    }
  }, [sortMethod]);

  const handleWidgetClick = (product: Product) => {
    console.log("Selected product:", product);
    console.log("Selected product price:", product.price);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        id: selectedProduct.id.toString(),
        title: selectedProduct.name,
        artist: user?.username || "Unknown Artist",
        price: selectedProduct.price,
        image: selectedProduct.image,
        sellerEmail: user?.email || "Unknown Email",
      });
      handleCloseModal();
    }
  };

  if (loading) return <div>Loading past purchases...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BuyerContainer>
      <div className="buyer-profile">
        <div className="buyer-content">
          <SellerInfo />
        </div>

        <div className="listing-header-container">
          <ListingHeader
            title="Past Purchases"
            onSortChange={setSortMethod}
            currentSort={sortMethod}
            showSort={true}
            showAddButton={false}
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
                  price={product.price}
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
            images={[selectedProduct.image]}
            title={selectedProduct.name}
            artist={user?.username || "Unknown Artist"}
            price={selectedProduct.price}
            sellerEmail={user?.email || "Unknown Email"} 
            id={selectedProduct.id.toString()} 
            typeOfArt={"Art"}
            bio={""}
            stock={selectedProduct.stock_amount || 0}
            location={""} 
            showAddToCart={false}
          />
        )}
      </div>
    </BuyerContainer>
  );
};

const BuyerContainer = styled.div`
  padding: 2rem;
  background-color: #1c1c1c;
  min-height: 100vh;
`;

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;

export default BuyerView;
