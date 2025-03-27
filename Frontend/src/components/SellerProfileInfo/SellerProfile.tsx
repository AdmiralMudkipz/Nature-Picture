import SellerInfo from "./SellerProfile/SellerInfo";
import Header from "./Header/Header";
import ListingHeader from "./ListingHeader/ListingHeader";
import ProductCard from "../ProductCard/ProductCard"; 
import "./SellerProfile.css";
import leafImage from "./leaf.jpg";  

// Sample product data (Replace with API data later)
const products = [
  { id: 1, name: "Leaf Painting", image: leafImage, price: 10.00 },
  { id: 2, name: "Handmade Vase", image: leafImage, price: 25.00 },
  { id: 3, name: "Wood Carving", image: leafImage, price: 40.00 },
];

const SellerProfile = () => {
  return (
    <div className="seller-profile">
      <div className="header-container">
        <Header />
      </div>

      <div className="seller-content">
        <SellerInfo />
      </div>
      <div className="listing-header-container">
        <ListingHeader />
      </div>

      <div className="product-card-wrapper">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};


export default SellerProfile;
