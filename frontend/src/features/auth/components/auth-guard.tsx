import { ROUTES } from '@/lib/constants';
import { ErrorPage } from '@/pages/error';
import { useQueryClient } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../hooks/use-auth';
import { authKeys } from '../utils/query-keys';

type AuthAllowMode = 'authenticated' | 'unauthenticated' | 'public';

interface AuthGuardProps {
  allowMode: AuthAllowMode;
}

function AuthGuard({ allowMode }: AuthGuardProps) {
  const { user, authError } = useAuth();
  const location = useLocation();
  const queryClient = useQueryClient();

  const handleAuthRetry = () => {
    queryClient.invalidateQueries({ queryKey: authKeys.user() });
  };

  const isBlockingError = authError && !user && allowMode !== 'public';

  if (isBlockingError) {
    return <ErrorPage error={authError} onRetry={handleAuthRetry} />;
  }

  if (allowMode === 'authenticated' && !user) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  if (allowMode === 'unauthenticated' && user) {
    return <Navigate to={ROUTES.USER.DASHBOARD} replace />;
  }

  return <Outlet />;
}

export { AuthGuard };
