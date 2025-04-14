import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the UserContext hook
import axios from "axios";
import styled from "styled-components";

interface LoginResponse {
  username: string;
  user_id: number;
  first_name: string; // Add first_name in the response type
  last_name: string;  // Add last_name in the response type
  email: string;      // Add email in the response type
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser(); // Destructure setUser from context to update the user state
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/api/login/",   // switch out with not on localhost 
        { username, password },
        { withCredentials: true }  // Ensure session cookie is sent with the request
      );

      // Destructure the response data
      const { username: userName, user_id, first_name, last_name, email } = response.data;

      // Update the user context
      setUser({
        username: userName,
        user_id,
        first_name,
        last_name,
        email,
      });

      const redirectPath = location.state?.from || "/home";
      navigate(redirectPath);
      console.log("Login successful:", response.data);
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>{isLogin ? "Welcome Back" : "Create Account"}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </FormGroup>
          <SubmitButton type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </SubmitButton>
        </Form>
        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <ToggleButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </ToggleButton>
        </ToggleText>
      </LoginBox>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1c1c1c;
  padding: 20px;
`;

const LoginBox = styled.div`
  background: linear-gradient(to right, #1c1c1c, #2c2c2c);
  padding: 40px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: rgba(255, 77, 79, 0.1);
  border-radius: 6px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #cccccc;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #2c2c2c;
  color: #ffffff;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }

  &::placeholder {
    color: #888;
  }
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const ToggleText = styled.p`
  color: #cccccc;
  text-align: center;
  margin-top: 20px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: #45a049;
  }
`;

export default Login;
