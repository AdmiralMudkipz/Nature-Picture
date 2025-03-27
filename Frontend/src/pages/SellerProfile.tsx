import SellerInfo from "../components/SellerProfileInfo/SellerInfo/SellerInfo";
import Header from "../components/SellerProfileInfo/Header/Header";
import ListingHeader from "../components/SellerProfileInfo/ListingHeader/ListingHeader";
import ProductCard from "../components/ProductCard/ProductCard"; 
import "../components/SellerProfileInfo/SellerProfile/SellerProfile.css";
import leafImage from "../components/SellerProfileInfo/leafImage.jpg";

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
