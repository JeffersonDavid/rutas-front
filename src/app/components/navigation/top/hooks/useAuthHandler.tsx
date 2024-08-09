import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';

export const useAuthHandler = () => {
  const { logout, user_is_logged, user } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
      const success : boolean  = await logout();
      if (success) {
        router.push('/login'); // Redirecciona al login si el logout fue exitoso
      } else {
        console.error('Logout failed');
      }
    
  }, [logout, router]);

  return {
    handleLogout,
    user_is_logged,
    user,
  };
};
