// AuthContext.tsx
'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { rest_authentication, rest_logout, UserResponse, ApiResponse } from '../components/auth/dataCript';

export const storage_key = 'authToken';

// AuthProvider Props
export interface AuthProviderProps {
  children: ReactNode;
}

// Define interfaces
export interface UserData {
  name: string;
  password: string;
}

// Define context type
export interface AuthContextType {
  authToken: string;
  user: UserResponse | null;
  login: (userData: UserData) => Promise<UserResponse | null>;
  logout: () => void;
  user_is_logged: boolean;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [authToken, setAuthToken] = useState<string>('');
  const [user_is_logged, setUser_is_logged] = useState<boolean>(false);

  // Helper function to clear auth state
  const clearAuthState = () => {
    localStorage.clear();
    setAuthToken('');
    setUser(null);
    setUser_is_logged(false);
  };

  // Logout function
  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem(storage_key);
      const res = await rest_logout(token || '');
      if (res.status === 200) {
        console.log('Logged out successfully');
      } else {
        console.error('Failed to logout:', res.error || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Error during logout:', error.message || error);
    } finally {
      clearAuthState();
    }
  }, []);

  // Initialize authentication state from local storage
  const initializeAuth = useCallback(() => {
    const storedToken = localStorage.getItem(storage_key);
    const storedUser = localStorage.getItem('user_data');
    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
      setUser_is_logged(true);
    } else {
      clearAuthState();
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Login function Promise<UserResponse | null>
  const login = useCallback(async ( userData: UserData )  : Promise<UserResponse | null> => {
    try {
      const response: ApiResponse = await rest_authentication(userData);
      if (response.status === 200 && response.body) {
        const userDetails: UserResponse = response.body;
        localStorage.setItem(storage_key, userDetails.token );
        localStorage.setItem('user_data', JSON.stringify(userDetails));
        setAuthToken(userDetails.token);
        setUser(userDetails);
        document.cookie = `authToken=${userDetails.token}; path=/;`;
        setUser_is_logged(true);
        return userDetails;
      } else {
        console.error('Authentication failed:', response.error || 'Unknown error');
        setUser_is_logged(false);
        return null;
      }
    } catch (error) {
      console.error('Error during login:', error);
      clearAuthState();
      return null;
    }
  }, []);

  // Provide context value to children
  return (
    <AuthContext.Provider value={{ authToken, user, login, logout, user_is_logged }}>
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
