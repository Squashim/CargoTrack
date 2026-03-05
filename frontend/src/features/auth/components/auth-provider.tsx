import { useQueryClient } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import type { AuthContextType } from '../context/auth-context';
import { AuthContext } from '../context/auth-context';
import { useAuthEvents } from '../hooks/use-auth-events';
import { authStorage } from '../utils/auth-storage';
import { authKeys } from '../utils/query-keys';
import { AuthLoader } from './auth-loader';

function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(() => authStorage.isAuthenticated());

  const onLogin = () => {
    authStorage.setAuthenticated();
    setIsConnected(true);
    queryClient.invalidateQueries({ queryKey: authKeys.user() });
  };

  const onLogout = () => {
    authStorage.clearAuthenticated();
    setIsConnected(false);
    queryClient.removeQueries({ queryKey: authKeys.user() });
  };

  const guestValue: AuthContextType = {
    user: null,
    authError: null,
    isLoading: false,
    isAuthenticated: false,
    onLogin,
    onLogout,
  };

  useAuthEvents({ onLogout });

  if (isConnected) {
    return (
      <AuthLoader onLogin={onLogin} onLogout={onLogout}>
        {children}
      </AuthLoader>
    );
  }

  return <AuthContext.Provider value={guestValue}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
