import styled from 'styled-components';
// import profilePicture from './profile-pic.jpeg';
import { useUser } from "../../context/UserContext"; // Adjust the path to match your project structure
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



interface SellerInfoProps {
  profilePic: string;
  name: string;
  rating: number;
  reviewsCount: number;
}

const SellerInfo: React.FC<SellerInfoProps> = ({
  profilePic,
  name,
  rating,
  reviewsCount,
}) => {
  const { user } = useUser(); // Access the logged-in user from the context

  return (
    <SellerInfoContainer>
      <ProfilePic src={profilePic} alt={name} />
      {/* Show the logged-in user's username or the seller's name */}
      <SellerName>{user ? `Welcome, ${user.username}` : name}</SellerName>
      <Rating>
        <span>⭐ {rating}</span>
        <ReviewsCount>({reviewsCount} reviews)</ReviewsCount>
      </Rating>
    </SellerInfoContainer>
  );
};

export default SellerInfo;
