'use client'
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { rest_authentication, rest_logout, UserResponse } from '../components/auth/dataCript';

export const storage_key = 'authToken';

// Define interfaces
export interface UserData {
  name: string;
  password: string;
}

// Define context type
interface AuthContextType {
  authToken: string;
  user: UserResponse | null;
  login: (userData: UserData) => Promise<UserResponse | null>;
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
  const [user, setUser] = useState<UserResponse | null>(null);
  const [authToken, setAuthToken] = useState<string>('');

  // Logout function
  const logout = useCallback(async () => {
    
    try {
      const token = localStorage.getItem(storage_key);
      const res = await rest_logout(token || '');
      if (res.status === 200) {
        console.log('Logged out successfully');
        localStorage.clear();
        setAuthToken('');
        setUser(null);
      } else {
        console.error('Failed to logout:', res.error || 'Unknown error');
        localStorage.clear();
        setAuthToken('');
        setUser(null);
      }
    } catch (error: any) {
      console.error('Error during logout:', error.message || error);
      localStorage.clear();
      setAuthToken('');
      setUser(null);
    }
  }, []);

  // Initialize authentication state from local storage
  const initializeAuth = useCallback(() => {
    const storedToken = localStorage.getItem(storage_key);
    const storedUser = localStorage.getItem('user_data');
    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Login function
  const login = useCallback(async (userData: UserData): Promise<UserResponse | null> => {
    try {
      const response = await rest_authentication(userData);
      if (response.status === 200 && response.body.user_data.token) {
        const userDetails = response.body.user_data;
        localStorage.setItem(storage_key, userDetails.token);
        localStorage.setItem('user_data', JSON.stringify(userDetails));
        setAuthToken(userDetails.token);
        setUser(userDetails);
        document.cookie = `authToken=${userDetails.token}; path=/;`;
        console.log('login realizadoooooo')
        return userDetails;
      } else {
        console.error('Authentication failed:', response.error || 'Unknown error');
        return null;
      }
    } catch (error) {
      console.error('Error during login:', error);
      logout();
      return null;
    }
  }, [logout]);

  // Provide context value to children
  return (
    <AuthContext.Provider value={{ authToken: authToken || '', user, login, logout }}>
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
