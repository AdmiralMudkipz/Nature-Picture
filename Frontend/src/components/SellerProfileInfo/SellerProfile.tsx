import styled from "styled-components";
import SellerInfo from "./SellerInfo";
import ListingHeader from "./ListingHeader";
import ProductCard from "../ProductCard";  // Imported ProductCard component
import leafImage from "./leaf.jpg";

// Sample product data (Replace with API data later)
const products = [
  { id: 1, name: "Leaf Painting", image: leafImage, price: 10.0 },
  { id: 2, name: "Handmade Vase", image: leafImage, price: 25.0 },
  { id: 3, name: "Wood Carving", image: leafImage, price: 40.0 },
];

const SellerProfile: React.FC = () => {
  return (
    <SellerProfileWrapper>
      <HeaderContainer>
        
      </HeaderContainer>

      <SellerContent>
        <SellerInfo />
      </SellerContent>

      <ListingHeaderContainer>
        <ListingHeader />
      </ListingHeaderContainer>

      <ProductCardWrapper>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductCardWrapper>
    </SellerProfileWrapper>
  );
};

export default SellerProfile;

// Styled Components
const SellerProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  width: 100%;
`;

const SellerContent = styled.div`
  width: 100%;
`;

const ListingHeaderContainer = styled.div`
  width: 100%;
`;

const ProductCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const ProductCard = styled.div`
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

