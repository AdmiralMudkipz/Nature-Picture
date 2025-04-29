import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define a User type
interface User {
  username: string;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  // Add other properties as necessary
}

// Define the shape of the context value
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  logout: () => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Logout function to clear user state and localStorage
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};