// hooks/useAuthHandler.ts
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { useLoader } from '@/app/appContexts/AppLoader';

export const useAuthHandler = () => {
  const { login, user_is_logged } = useAuth();
  const [authError, setAuthError] = useState(false);
  const router = useRouter();
  const { setIsLoading } = useLoader();

  const handleLogin = useCallback(
    async (name: string, password: string) => {
      const userData = { name, password };
      const isUserLogged = await login(userData);
      if (isUserLogged) {
        setIsLoading(true);
        setAuthError(false);
        router.push('/dashboard');
      } else {
        setAuthError(true);
      }
    },
    [login, router, setIsLoading]
  );

  const handleCloseAlert = useCallback(() => {
    setAuthError(false);
  }, []);

  return {
    user_is_logged,
    authError,
    handleLogin,
    handleCloseAlert,
  };
};