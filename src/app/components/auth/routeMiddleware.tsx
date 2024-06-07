import React, { ReactNode, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { storage_key, useAuth } from '@/app/appContexts/AuthContext';
import { fetchData } from './dataCript';

interface MiddlewareProps {
  children: ReactNode;
}

const RouteMiddleware: React.FC<MiddlewareProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, authToken } = useAuth();


  const checkAuth = useCallback(async () => {

    const token = localStorage.getItem(storage_key) || undefined;

    if (!authToken && !token && pathname !== '/login') {
      logout();
      router.push('/login');
      return;
    }

    debugger
    const validateTokenResponse = await fetchData('http://localhost/api/user-cheking', { data: null }, token);

    if (validateTokenResponse.status !== 200) {
      logout();
      router.push('/login');
    }
  }, [logout, pathname, router, authToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authToken && pathname !== '/login') {
      router.push('/login');
    }
  }, [authToken, pathname, router]);

  return <>{children}</>;
};

export default RouteMiddleware;
