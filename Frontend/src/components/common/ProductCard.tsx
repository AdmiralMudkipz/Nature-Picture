import React, {useState} from "react";
import styled from "styled-components";
import ListingWidget from "./modalstuff/ListingWidget";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  typeOfArt: string;
  location: string;
  date: string;
};

type ProductCardProps = {
  product: Product;
};

// Styled components
const Card = styled.div`
  width: 220px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  text-align: center;
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  font-size: 16px;
`;

const Name = styled.span`
  font-weight: bold;
  text-align: left;
  flex: 1;
`;

const Price = styled.span`
  font-weight: bold;
  color: #007bff;
  text-align: right;
`;

const ProductCard = ({ product }: ProductCardProps) => {
  //going to add an onclick onto this!
    const [isWidgetOpen, setIsWidgetOpen] = useState(false); // State for modal visibility
  
    const handleOpenWidget = () => {
      setIsWidgetOpen(true); // Open modal when "Add Listing" button is clicked
    };
  
    const handleCloseWidget = () => {
      setIsWidgetOpen(false); // Close modal when closing
    };
  return (
    <Card onClick={handleOpenWidget}>
      
      <Image src={product.image} alt={product.name} />
      <Info>
        <Name>{product.name}</Name>
        <Price>${product.price.toFixed(2)}</Price>
      </Info>
        {/* Add Listing Widget */}
        <ListingWidget isOpen={isWidgetOpen} handleClose={handleCloseWidget} product={product}>
        {/* The widget content you have already in ListingWidget will be rendered here */}
        </ListingWidget>
    </Card>
  );
};

export default ProductCard;
