'use client'
import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation'
import { useAuth } from '../../appContexts/AuthContext';
import { redirect } from 'next/navigation'

interface MiddlewareProps {
  children: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ children }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  
  useEffect(() => {
    
    if (pathname !== '/login' && !user) {
        redirect('/login')
    }

  }, [pathname, user]);
  return <>
      {children}
  </>;
};
export default Middleware;
