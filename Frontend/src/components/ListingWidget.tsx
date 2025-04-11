import React from "react";
import styled from "styled-components";
import ReactPortal from "./ReactPortal";

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  color: black;
  border: 1px solid #000;
  cursor: pointer;
`;

const Label = styled.label`
  margin-top: 10px;
  color: black;
`;

interface ListingWidgetProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode; // Add children as an optional prop
  product: Product;
}

const ListingWidget: React.FC<ListingWidgetProps> = ({
  isOpen,
  handleClose,
  children,
  product,
}) => {
    const addToCart = (e: React.FormEvent) => {
      e.preventDefault();
      //selected product here
      console.log("Added listing to cart: ", product);
      handleClose()
    }
    //so what i imagine i gotta do is grab whatever product from the database and show it here
    if (!isOpen) return null;
    return (
        <ReactPortal wrapperId="listing-widget">
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={handleClose}>X</CloseButton>
              {children}
              <StyledForm onSubmit={addToCart}>
                <Label>Title: {product.name}</Label>
                <Image src={product.image} alt={product.name} />
                <Label>Description:</Label>
                <p>{product.description}</p>
                <Label>Price: ($){product.price}</Label>
                <Label>Stock: {product.stock}</Label>
                <Label>Type of Art: {product.typeOfArt}</Label>
                <Label>County: {product.location}</Label>
                <SubmitButton>Add to Cart</SubmitButton>
              </StyledForm>
            </ModalContent>
          </ModalOverlay>
        </ReactPortal>
      );
};
export default ListingWidget;