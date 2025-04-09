import styled from "styled-components";
import profilePicture from "../components/SellerProfileInfo/profile-pic.jpeg";

// Type definition for the buyer object
type Buyer = {
  name: string;
  profilePic: string;
  rating: number;
  reviewsCount: number;
};

// Styled Components
const BuyerContainer = styled.div`
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

const BuyerName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 5px;
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

const BuyerInfo = () => {
  // Placeholder data (replace this with API data once it's available)
  const buyer: Buyer = {
    name: "Buyer Profile",
    profilePic: profilePicture,
    rating: 3.5,
    reviewsCount: 130,
  };

  return (
    <BuyerContainer>
      <ProfilePic src={buyer.profilePic} alt={buyer.name} />
      <BuyerName>{buyer.name}</BuyerName>
      <Rating>
        <span>⭐ {buyer.rating}</span>
        <ReviewsCount>({buyer.reviewsCount} reviews)</ReviewsCount>
      </Rating>
    </BuyerContainer>
  );
};

export default BuyerInfo;
