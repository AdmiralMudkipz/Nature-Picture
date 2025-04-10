import Navbar from "../components/Navbar";
import BuyerInfo from "../components/BuyerInfo";
import ProductCard from "../components/ProductCard";
import leafImage from "../components/SellerProfileInfo/leafImage.jpg";

// Sample product data (Replace with API data later)
const products = [
  { id: 1, name: "Leaf Painting", image: leafImage, price: 10.0 },
  { id: 2, name: "Handmade Vase", image: leafImage, price: 25.0 },
  { id: 3, name: "Wood Carving", image: leafImage, price: 40.0 },
];

const BuyerView = () => {
  return (
    <div className="seller-profile">
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="buyer-content">
        <BuyerInfo />
      </div>
      <div className="product-card-wrapper">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BuyerView;
