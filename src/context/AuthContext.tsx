import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  profilePicture?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userEmail: string) => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const extractNameFromEmail = (email: string) => {
    const storedName = localStorage.getItem("user_name");
    if (storedName) return storedName;
    
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userEmail = localStorage.getItem("user_email");
    if (token && userEmail) {
      setIsAuthenticated(true);
      setUser({
        name: extractNameFromEmail(userEmail),
        email: userEmail,
      });
    }
  }, []);

  const login = (token: string, userEmail: string) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_email", userEmail);
    setIsAuthenticated(true);
    setUser({
      name: extractNameFromEmail(userEmail),
      email: userEmail,
    });
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);