'use client'
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { rest_authentication } from '../components/auth/dataCript';

// Define interfaces
export interface UserData {
  name: string;
  password: string;
}

export interface AuthToken {
  authToken: string;
}

// Define context type
interface AuthContextType {
  authToken: string | null;
  user: UserData | null;
  login: (userData: UserData) => Promise<void>;
  logout: () => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    initializeAuth();

  }, []);

  // Initialize authentication state from local storage
  const initializeAuth = () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {

      setAuthToken(storedToken);
      
    }
    else
    {
      setAuthToken(null)
      localStorage.removeItem('authToken');
      
    }
  };

  // Login function
  const login = async (userData: UserData) => {
    try {
        const token = await rest_authentication(userData);
        // Ensure token is not null before setting it
        if (token !== null) {

            localStorage.setItem('authToken', token);
            console.log(token)
            setAuthToken(token);

        } else {
          
            console.error('Authentication failed: Token is null');
            setAuthToken(null);

        }
    } catch (error) {
        // Handle authentication errors
        console.error('Error during login:', error);
        setAuthToken(null);
    }
};

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  // Provide context value to children
  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
