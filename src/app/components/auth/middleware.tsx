'use client'
import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation'
import { useAuth } from '../../appContexts/AuthContext';

interface MiddlewareProps {
  children: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    console.log(pathname);

    if (pathname !== '/login' && !user) {
      // Aquí puedes realizar acciones adicionales si el usuario no está autenticado y no está en la página de inicio de sesión
    }

  }, [pathname, user]);

  return <>{children}</>;
};

export default Middleware;
