import { Navigate, Outlet, useLocation } from 'react-router';

type AuthAllowMode = 'authenticated' | 'unauthenticated' | 'public';

interface AuthGuardProps {
  allowMode: AuthAllowMode;
}

function AuthGuard({ allowMode }: AuthGuardProps) {
  const user = true; // replace with actual auth state
  const location = useLocation();

  if (!user && allowMode === 'authenticated') {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (user && allowMode === 'unauthenticated') {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />;
}

export { AuthGuard };
