'use client';

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { rest_authentication, rest_logout, UserResponse, ApiResponse } from '../../components/auth/dataCript';
import { AuthContextType, AuthProviderProps } from './Contracts';
import { clearAllCookiesFromClient, defaultUser, setCookie, getCookie } from './Utils';
import { UserData } from './Contracts';

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse>(defaultUser);
  const [authToken, setAuthToken] = useState<string>('');
  const [user_is_logged, setUser_is_logged] = useState<boolean>(false);

  // Helper function to clear auth state
  const clearAuthState = () => {
    localStorage.clear();
    clearAllCookiesFromClient();
    setAuthToken('');
    setUser(defaultUser);
    setUser_is_logged(false);
  };

  // Helper function to set login parameters
  const setLoginParams = (userDetails: UserResponse) => {
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 4);

    setAuthToken(userDetails.token);
    setUser(userDetails);
    setUser_is_logged(true);

    setCookie('userData', JSON.stringify(userDetails), {
      path: '/',
      expires: expiryDate,
      secure: true,
      sameSite: 'Lax',
    });

    setCookie('authToken', userDetails.token, {
      path: '/',
      expires: expiryDate,
      secure: true,
      sameSite: 'Lax',
    });
  };

  // Logout function
  const logout = useCallback(async () => {
    try {
      const token = getCookie('authToken');
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

  // Initialize authentication state from cookies
  const initializeAuth = useCallback(() => {
    const storedToken = getCookie('authToken');
    const storedUser = getCookie('userData');

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

  // Login function
  const login = useCallback(async (userData: UserData): Promise<UserResponse | null> => {
    try {
      const response: ApiResponse = await rest_authentication(userData);

      if (response.status === 200 && response.body) {
        const userDetails: UserResponse = response.body;
        setLoginParams(userDetails);
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

export { AuthProvider };
