'use client'
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface UserData {
  // Define la estructura de los datos de usuario
  username: string;
  // Otros datos de usuario si es necesario
}

interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Aquí deberías hacer una solicitud al servidor para validar el token y obtener los datos del usuario
      // Por simplicidad, asumiremos que el token es válido y simularemos la sesión del usuario
      setUser({ username: 'user123' });
    }else{

      setUser(null);
    }

  }, []);

  const login = (userData: UserData) => {
    // Lógica para iniciar sesión, como enviar una solicitud al servidor para autenticar al usuario
    // Una vez autenticado, guardar el token en el almacenamiento local
    localStorage.setItem('authToken', 'exampleAuthToken');
    setUser(userData);
  };

  const logout = () => {
    // Lógica para cerrar sesión, como eliminar el token de autenticación almacenado
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
