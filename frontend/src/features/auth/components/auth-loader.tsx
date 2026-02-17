import { LoadingPage } from '@/pages/loading';
import { isAxiosError } from 'axios';
import { useEffect, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { AuthContext } from '../context/auth-context';
import { useUserAuth } from '../queries/use-user-auth';

interface AuthLoaderProps {
  onLogin: () => void;
  onLogout: () => void;
}

export function AuthLoader({ children, onLogin, onLogout }: PropsWithChildren<AuthLoaderProps>) {
  const { t } = useTranslation();
  const { data: user, isLoading, error, refetch } = useUserAuth();

  useEffect(() => {
    if (isAxiosError(error) && error.response?.status === 401) {
      toast.info(t('errors.sessionExpired'));
      onLogout();
    }
  }, [error, onLogout, t]);

  if (isLoading) {
    return <LoadingPage />;
  }

  const value = {
    user: user ?? null,
    authError: error,
    isLoading: false,
    isAuthenticated: true,
    onLogin,
    onLogout,
    refetchUser: refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
