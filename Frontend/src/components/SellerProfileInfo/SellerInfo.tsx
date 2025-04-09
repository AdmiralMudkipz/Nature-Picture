import styled from 'styled-components';
import profilePicture from './profile-pic.jpeg';

const SellerInfoContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const ProfilePic = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 2px solid black;
`;

const SellerName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-size: 18px;
`;

const ReviewsCount = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #555;
`;

type Seller = {
  name: string;
  profilePic: string;
  rating: number;
  reviewsCount: number;
};

const SellerInfo = () => {
  const seller: Seller = {
    name: 'Jane Doe',
    profilePic: profilePicture,
    rating: 4.5,
    reviewsCount: 120,
  };

  return (
    <SellerInfoContainer>
      <ProfilePic src={seller.profilePic} alt={seller.name} />
      <SellerName>{seller.name}</SellerName>
      <Rating>
        <span>⭐ {seller.rating}</span>
        <ReviewsCount>({seller.reviewsCount} reviews)</ReviewsCount>
      </Rating>
    </SellerInfoContainer>
  );
};

export default SellerInfo;
