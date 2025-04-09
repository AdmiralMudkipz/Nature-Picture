import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the UserContext hook
import axios from "axios";

interface LoginResponse {
  username: string;
  user_id: number;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(""); // Change 'email' to 'username'
  const [password, setPassword] = useState("");
  const { setUser } = useUser(); // Destructure setUser from context to update the user state
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Specify the expected response type
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/api/login/",
        { username, password }
      );

      // Destructure the response data
      const { username: userName, user_id } = response.data;

      // Update the user context
      setUser({ username: userName, user_id });

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
