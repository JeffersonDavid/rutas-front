import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
import { storage_key } from '@/app/appContexts/AuthContext';

interface MiddlewareProps {
  children: ReactNode;
}

const RouteMiddleware: React.FC<MiddlewareProps> = ({ children }) => {
  const pathname = usePathname();
  const token = localStorage.getItem(storage_key)
  // Verifica si la ruta no es '/login' y redirige si no hay token de autenticación
  if (pathname !== '/login' && !token) {
      redirect('/login');
  }
  // Renderiza los children si la ruta es '/login' o si hay un token de autenticación
  return <> { children }</>;
};

export default RouteMiddleware;
