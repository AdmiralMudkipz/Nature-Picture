import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the UserContext hook
import axios from "axios";

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
  const { setUser } = useUser(); // Destructure setUser from context to update the user state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
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
  
      // Redirect after successful login
      navigate("/home");
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
