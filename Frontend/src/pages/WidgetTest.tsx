import styled from "styled-components";
import ProductCard from "../components/ProductCard";  // Imported ProductCard component
import leafImage from "../components/SellerProfileInfo/leafImage.jpg"

// Sample product data (Replace with API data later)
const products = [
 { id: 1, name: "Leaf Painting", image: leafImage, price: 10.0, typeOfArt: "Painting", location: "Somerset County", stock: 1, description: "very cool painting", date: "2/22/2025"},
   { id: 2, name: "Handmade Vase", image: leafImage, price: 25.0, typeOfArt: "Pottery", location: "Somerset County", stock: 1, description: "ssssssshiny", date: "2/21/2025" },
   { id: 3, name: "Wood Carving", image: leafImage, price: 40.0, typeOfArt: "Woodwork", location: "Somerset County", stock: 1, description: "something cool cool cool cool cool", date: "3/19/2025" },
];

const WidgetTest: React.FC = () => {
    return (
      <WidgetTestWrapper>
        <HeaderContainer>
         <p>by</p>
        </HeaderContainer>
  
        <ProductCardWrapper>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductCardWrapper>
      </WidgetTestWrapper>
    );
  };
  
  export default WidgetTest;
  
  // Styled Components
  const WidgetTestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  `;
  
  const HeaderContainer = styled.div`
    width: 100%;
  `;
  
  const ProductCardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  `;
  
  