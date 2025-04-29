// src/components/modalstuff/Modal.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";

interface ModalProps {
  images: string[];
  title: string;
  artist: string;
  price: number;
  typeOfArt: string;
  bio: string;
  stock: number;
  onClose: () => void;
  onAddToCart: () => void;
  showAddToCart?: boolean;
  sellerId?: string; // Add sellerId prop
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({
  images,
  title,
  artist,
  price,
  typeOfArt,
  bio,
  stock,
  onClose,
  onAddToCart,
  showAddToCart = true,
  sellerId,
  isOpen,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useUser();
  
  // Check if the current user is the seller of this item
  const isUserSeller = user && sellerId && user.user_id.toString() === sellerId;

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <LeftSection>
          <ImageWrapper>
            <img
              src={images[currentImageIndex]}
              alt={title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.log(`Failed to load image: ${images[currentImageIndex]}`);
                target.src =
                  "data:image/svg+xml;base64," +
                  btoa(
                    `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="400" fill="#ccc"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#333" font-size="24">Image Not Found</text>
        </svg>`
                  );
              }}
            />
          </ImageWrapper>
          {images.length > 1 && (
            <ImageNavigation>
              <NavButton onClick={goToPreviousImage}>‹</NavButton>
              <NavButton onClick={goToNextImage}>›</NavButton>
            </ImageNavigation>
          )}
        </LeftSection>
        <RightSection>
          <Details>
            <Title>{title}</Title>
            <Artist>By: {artist}</Artist>
            <Price>${price.toFixed(2)}</Price>
            <TypeOfArt>Type: {typeOfArt}</TypeOfArt>
            <Bio>{bio}</Bio>
            <Stock>Stock: {stock}</Stock>
            
            {/* Show warning if user is trying to buy their own art */}
            {isUserSeller && (
              <SellerWarning>
                You cannot purchase your own artwork
              </SellerWarning>
            )}
          </Details>
          {/* Only render the Add to Cart button if showAddToCart is true and user is not the seller */}
          {showAddToCart && !isUserSeller && (
            <AddToCartButton onClick={onAddToCart} disabled={stock <= 0}>
              {stock <= 0 ? "Sold Out" : "Add to Cart"}
            </AddToCartButton>
          )}
          
          {/* Show disabled button with message if user is the seller */}
          {showAddToCart && isUserSeller && (
            <DisabledButton disabled>
              You created this artwork
            </DisabledButton>
          )}
        </RightSection>
      </ModalContent>
    </ModalBackdrop>
  );
};

// Styled Components for the Modal
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9); /* Dark semi-transparent backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  display: flex;
  background: #1c1c1c; /* Match site's dark aesthetic */
  border-radius: 12px;
  overflow: hidden;
  max-width: 900px;
  width: 80%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
`;

const LeftSection = styled.div`
  flex: 1;
  background: #292929; /* Slightly lighter background for contrast */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 500px;
  overflow: hidden;
  border-radius: 8px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px; /* Smooth edges for consistency */
  }
`;

const ImageNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 24px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const RightSection = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Details = styled.div`
  color: white;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  color: #ffffff;
`;

const Artist = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  color: #cccccc;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #4caf50;
  margin-bottom: 15px;
`;

const TypeOfArt = styled.p`
  font-size: 16px;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Bio = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #dddddd;
`;

const Stock = styled.p`
  font-size: 16px;
  color: #aaaaaa;
  margin-top: 20px;
`;

const SellerWarning = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff4d4f;
  border-radius: 4px;
  text-align: center;
`;

const AddToCartButton = styled.button<{ disabled?: boolean }>`
  background: rgb(0, 0, 0);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: rgb(4, 90, 34);
  }

  &:disabled {
    background: #444;
    cursor: not-allowed;
    color: #aaa;
  }
`;

const DisabledButton = styled.button`
  background: #333;
  color: #999;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 8px;
  cursor: not-allowed;
  margin-top: 20px;
`;

export default Modal;