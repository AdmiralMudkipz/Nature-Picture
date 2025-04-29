import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the UserContext hook
import axios from "axios";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// Home page is using this login.tsx file. other one needs to be deleted. 

interface LoginResponse {
  username: string;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface SignUpData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: ""
  });
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({});
  const { setUser } = useUser(); // Destructure setUser from context to update the user state
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/base/users/login/",   // switch out with not on localhost 
        { username, password },
        { withCredentials: true }  // Ensure session cookie is sent with the request
      );

      // Destructure the response data
      const { username: userName, user_id, first_name, last_name, email } = response.data;

      // Create the user object
      const userData = {
        username: userName,
        user_id,
        first_name,
        last_name,
        email,
      };

      // Update the user context - this will also save to localStorage via the effect in UserContext
      setUser(userData);

      // Manually save to localStorage as a backup
      localStorage.setItem("user", JSON.stringify(userData));

      const redirectPath = location.state?.from || "/Home";
      navigate(redirectPath);
      console.log("Login successful:", response.data);
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const validateSignUp = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signUpData.username) newErrors.username = 'Username is required';
    if (!signUpData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signUpData.email)) newErrors.email = 'Email is invalid';
    if (!signUpData.first_name) newErrors.first_name = 'First name is required';
    if (!signUpData.last_name) newErrors.last_name = 'Last name is required';
    if (!signUpData.password) newErrors.password = 'Password is required';
    else if (signUpData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!signUpData.password_confirm) newErrors.password_confirm = 'Please confirm your password';
    else if (signUpData.password !== signUpData.password_confirm) newErrors.password_confirm = 'Passwords do not match';

    setSignUpErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/base/users/signup/",
        {
          username: signUpData.username,
          email: signUpData.email,
          first_name: signUpData.first_name,
          last_name: signUpData.last_name,
          password: signUpData.password,
          password_confirm: signUpData.password_confirm, // match password
        }
      );
      
      console.log("Sign up successful:", response.data);
      setIsLogin(true); // Switch to login mode after successful signup
    } catch (error: any) {
      console.error("Sign up failed:", error);
      setError(error.response?.data?.message || "Sign up failed. Please try again.");
    }
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (signUpErrors[name]) {
      setSignUpErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>{isLogin ? "Welcome Back" : "Create Account"}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {isLogin ? (
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <InputGroup>
                <Icon><FaUser /></Icon>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Username"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Icon><FaLock /></Icon>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </InputGroup>
            </FormGroup>
            <SubmitButton type="submit">Login</SubmitButton>
          </Form>
        ) : (
          <Form onSubmit={handleSignUp}>
            <FormGroup>
              <InputGroup>
                <Icon><FaUser /></Icon>
                <Input
                  type="text"
                  name="username"
                  value={signUpData.username}
                  onChange={handleSignUpChange}
                  placeholder="Username"
                  $hasError={!!signUpErrors.username}
                />
              </InputGroup>
              {signUpErrors.username && <ErrorText>{signUpErrors.username}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Icon><FaEnvelope /></Icon>
                <Input
                  type="email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  placeholder="Email"
                  $hasError={!!signUpErrors.email}
                />
              </InputGroup>
              {signUpErrors.email && <ErrorText>{signUpErrors.email}</ErrorText>}
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Input
                  type="text"
                  name="first_name"
                  value={signUpData.first_name}
                  onChange={handleSignUpChange}
                  placeholder="First Name"
                  $hasError={!!signUpErrors.first_name}
                />
                {signUpErrors.first_name && <ErrorText>{signUpErrors.first_name}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Input
                  type="text"
                  name="last_name"
                  value={signUpData.last_name}
                  onChange={handleSignUpChange}
                  placeholder="Last Name"
                  $hasError={!!signUpErrors.last_name}
                />
                {signUpErrors.last_name && <ErrorText>{signUpErrors.last_name}</ErrorText>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <InputGroup>
                <Icon><FaLock /></Icon>
                <Input
                  type="password"
                  name="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  placeholder="Password"
                  $hasError={!!signUpErrors.password}
                />
              </InputGroup>
              {signUpErrors.password && <ErrorText>{signUpErrors.password}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <Icon><FaLock /></Icon>
                <Input
                  type="password"
                  name="password_confirm"
                  value={signUpData.password_confirm}
                  onChange={handleSignUpChange}
                  placeholder="Confirm Password"
                  $hasError={!!signUpErrors.password_confirm}
                />
              </InputGroup>
              {signUpErrors.password_confirm && <ErrorText>{signUpErrors.password_confirm}</ErrorText>}
            </FormGroup>

            <SubmitButton type="submit">Sign Up</SubmitButton>
          </Form>
        )}
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
  max-width: 500px;
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

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 4px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  position: absolute;
  left: 12px;
  color: #888;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border-radius: 6px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#ff4d4f' : '#444')};
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