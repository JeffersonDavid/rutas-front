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
    if (pathname !== '/login' && !user) {
       window.location.href = '/login';
    }

  }, [pathname, user]);
  return <>{children}</>;
};
export default Middleware;
