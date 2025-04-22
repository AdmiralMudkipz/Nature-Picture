import styled from 'styled-components';
import { useUser } from "../../context/UserContext"; // Adjust the path to match your project structure
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  gap: 10px;
`;

const ReviewsCount = styled.span`
  font-size: 14px;
  color: #555;
`;

const LogoutButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #ff7875;
  }
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
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/base/users/logout/", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SellerInfoContainer>
      <ProfilePic src={profilePic} alt={name} />
      <SellerName>{user ? `Welcome, ${user.username}` : name}</SellerName> {/* show username if logged in */}
      <Rating>
        <span>⭐ {rating}</span>
        <ReviewsCount>({reviewsCount} reviews)</ReviewsCount>
        {user && <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>} {/* only show if user is logged in */}
      </Rating>
    </SellerInfoContainer>
  );
};

export default SellerInfo;
