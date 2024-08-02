import { UserResponse } from '../../components/auth/dataCript';
import { ReactNode } from 'react';

export interface CookieOptions {
  path?: string;
  expires?: Date | string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

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
    user: UserResponse;
    login: (userData: UserData) => Promise<UserResponse | null>;
    logout: () => void;
    user_is_logged: boolean;
}
  
// Default user for non-authenticated state

export interface CookieOptions {
  path?: string;
  expires?: Date | string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}