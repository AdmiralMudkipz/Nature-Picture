import React, { useState, useEffect } from "react";
import BuyerInfo from "../components/BuyerInfo";
import ListingWidget from "../components/modalstuff/ListingWidget";
import ListingModal from "../components/modalstuff/Modal";
import { useUser } from "../context/UserContext";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  date: string;
  sellerEmail: string;
  artist: string;
}

const BuyerView: React.FC = () => {
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("newest");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.user_id) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/base/purchase_order/purchase-history/`
        );
        const allProducts = response.data;

        const formatted = allProducts.map((item: any) => ({
          id: item.art_id,
          name: item.name,
          image: item.image,
          price: item.price,
          date: item.date_purchased || "2025-04-01",
          sellerEmail: item.seller_email,
          artist: item.artist_name,
        }));

        setProducts(formatted);
        console.log("PAST PURCHASES:", formatted);
      } catch (err) {
        console.error("Error fetching past purchases:", err);
      }
    };

    fetchPurchases();
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
    <div className="seller-profile">
      <div className="buyer-content">
        <BuyerInfo />
      </div>

      <div className="listing-header-container">
        <h1 style={{ fontSize: "1.5rem" }}>Past Purchases</h1>
        {/* Optional: You can add sorting dropdown here if you want */}
      </div>

      <div
        className="product-card-wrapper"
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
      >
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
              artist={product.artist}
              price={Number(product.price)}
              sellerEmail={product.sellerEmail}
            />
          </div>
        ))}
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
            artist: selectedProduct.artist,
            sellerEmail: selectedProduct.sellerEmail,
          }}
        />
      )}
    </div>
  );
};

export default BuyerView;
