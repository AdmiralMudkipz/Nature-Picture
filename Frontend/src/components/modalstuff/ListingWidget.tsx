import React from 'react';
import styled from 'styled-components';

// WidgetProps Interface
interface WidgetProps {
  image: string;
  title: string;
  artist: string;
  price: number;
  sellerEmail: string;
  id: string;
  soldOut?: boolean;
}

const Widget: React.FC<WidgetProps> = ({ image, title, artist, price, sellerEmail, id, soldOut }) => {
  return (
    <WidgetContainer>
      <ImageWrapper>
        <Image src={image} alt={title} />
        {soldOut && <SoldOutBadge>SOLD OUT</SoldOutBadge>}
        <GradientOverlay />
      </ImageWrapper>
      <Overlay>
        <Info>
          <Title>{title}</Title>
          <Artist>by {artist}</Artist>
          <Price>${price.toFixed(2)}</Price>
        </Info>
      </Overlay>
    </WidgetContainer>
  );
};

// Styled-components
const WidgetContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${WidgetContainer}:hover & {
    transform: scale(1.1);
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${WidgetContainer}:hover & {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  ${WidgetContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Info = styled.div`
  text-align: left;
  color: white;
  width: 100%;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Artist = styled.p`
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const Price = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #4CAF50;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const SoldOutBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 0, 0, 0.85);
  color: white;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 6px;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;


export default Widget;
