import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface UserContextType {
  user: { username: string; user_id: number } | null;
  setUser: React.Dispatch<React.SetStateAction<{ username: string; user_id: number } | null>>;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ username: string; user_id: number } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

