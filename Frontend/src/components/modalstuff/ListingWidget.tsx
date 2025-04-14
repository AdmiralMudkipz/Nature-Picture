import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// WidgetProps Interface
interface WidgetProps {
  image: string;
  title: string;
  artist: string;
  price: number;
  isLandscape: boolean;
}

const Widget: React.FC<WidgetProps> = ({ image, title, artist, price, isLandscape }) => {
  const [imageOrientation, setImageOrientation] = useState<'landscape' | 'portrait'>('landscape');

  useEffect(() => {
    const img = document.createElement('img');
    img.src = image;
    img.onload = () => {
      setImageOrientation(img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait');
    };
  }, [image]);

  return (
    <WidgetContainer isLandscape={imageOrientation === 'landscape'}>
      <ImageContainer>
        <Image 
          src={image} 
          alt={title} 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
      </ImageContainer>
      <InfoOverlay>
        <Title>{title}</Title>
        <Artist>By: {artist}</Artist>
        <Price>${price.toFixed(2)}</Price>
      </InfoOverlay>
    </WidgetContainer>
  );
};

// Styled-components
const WidgetContainer = styled.div<{ isLandscape: boolean }>`
  position: relative;
  width: ${({ isLandscape }) => (isLandscape ? '300px' : '200px')};
  height: ${({ isLandscape }) => (isLandscape ? '200px' : '300px')};
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background: #2a2a2a;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${WidgetContainer}:hover & {
    transform: scale(1.1);
  }
`;

const InfoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  color: #ffffff;
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s ease;

  ${WidgetContainer}:hover & {
    transform: translateY(0);
  }
`;

const Title = styled.h3`
  margin: 0 0 5px;
  font-size: 18px;
  font-weight: 600;
`;

const Artist = styled.p`
  margin: 0 0 5px;
  font-size: 14px;
  opacity: 0.9;
`;

const Price = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #4CAF50;
`;

export default Widget;
