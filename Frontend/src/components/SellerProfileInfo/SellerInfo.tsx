import styled from 'styled-components';
import { useUser } from "../../context/UserContext"; // Adjust the path to match your project structure
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



interface SellerInfoProps {
  name: string;
}

const SellerInfo: React.FC<SellerInfoProps> = ({
  name,
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
      <SellerName>{user ? `Welcome, ${user.username}` : name}</SellerName>
        {user && <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>}
    </SellerInfoContainer>
  );
};
const SellerInfoContainer = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 80px; /* Adjust this value based on your navbar height */
`;


const SellerName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0;
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
export default SellerInfo;
