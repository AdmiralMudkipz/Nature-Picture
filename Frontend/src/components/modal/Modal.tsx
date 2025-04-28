import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';

interface ModalProps {
  images: string[];
  title: string;
  artist: string;
  price: number;
  typeOfArt: string;
  bio: string;
  onClose: () => void;
  sellerEmail: string;
  id: string;
  stock: number;
  location: string;
  showAddToCart?: boolean; // added this prop to control the button visibility
}

const Modal: React.FC<ModalProps> = ({
  images,
  title,
  artist,
  price,
  typeOfArt,
  bio,
  onClose,
  sellerEmail,
  id,
  stock,
  location,
  showAddToCart = true,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

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

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      artist,
      price,
      image: images[0],
      sellerEmail
    });
    onClose();
  };

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
                target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
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
            <Stock>In Stock: {stock}</Stock>
            <Location>Location: {location}</Location>
          </Details>
          {/* Only render the Add to Cart button if showAddToCart is true */}
          {showAddToCart && (
            <AddToCartButton onClick={handleAddToCart}>
              Add to Cart
            </AddToCartButton>
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
  color: #4CAF50;
  margin-bottom: 15px;
`;

const TypeOfArt = styled.p`
  font-size: 16px;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Stock = styled.p`
  font-size: 16px;
  color: #cccccc;
  margin-top: 10px;
`;

const Location = styled.p`
  font-size: 16px;
  color: #cccccc;
  margin-top: 5px;
`;

const Bio = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #dddddd;
`;

const AddToCartButton = styled.button`
  background:rgb(0, 0, 0);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;

  &:hover {
    background:rgb(4, 90, 34);
  }
`;

export default Modal;
