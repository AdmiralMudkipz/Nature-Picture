import React, { useState, useEffect } from "react";
import SellerInfo from "../components/SellerProfileInfo/SellerInfo";
import ListingHeader from "../components/SellerProfileInfo/ListingHeader";
import ProductCard from "../components/ProductCard";
import leafImage from "../components/SellerProfileInfo/leafImage.jpg";
import Navbar from "../components/Navbar";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  date: string; // Added for sorting "newest"
}

// Sample product data (Replace with API data later)
const sellerProducts: Product[] = [
  {
    id: 1,
    name: "Leaf Painting",
    image: leafImage,
    price: 10.0,
    date: "2025-04-01",
  },
  {
    id: 2,
    name: "Handmade Vase",
    image: leafImage,
    price: 25.0,
    date: "2025-04-03",
  },
  {
    id: 3,
    name: "Wood Carving",
    image: leafImage,
    price: 40.0,
    date: "2025-04-02",
  },
];

const SellerPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(sellerProducts);
  const [sortMethod, setSortMethod] = useState<string>("newest");

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

  return (
    <div className="seller-profile">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="seller-content">
        <SellerInfo />
      </div>

      <div className="listing-header-container">
        <ListingHeader
          onSortChange={setSortMethod}
          currentSort={sortMethod}
          showSort={true}
        />
      </div>

      <div className="product-card-wrapper">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SellerPage;
