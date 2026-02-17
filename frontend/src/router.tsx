import { AuthGuard } from '@/features/auth/components/auth-guard';
import { DashboardPage } from '@/pages/dashboard';
import { ErrorPage } from '@/pages/error';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { WelcomePage } from '@/pages/welcome';
import { createBrowserRouter, Navigate } from 'react-router';
import App from './App';
import { AuthLayout } from './components/layout/auth-layout';
import { ROUTES } from './lib/constants';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { element: <AuthGuard allowMode="public" />, children: [{ index: true, element: <WelcomePage /> }] },
      {
        path: ROUTES.AUTH.BASE,
        element: <AuthGuard allowMode="unauthenticated" />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { index: true, element: <Navigate to={ROUTES.AUTH.LOGIN} replace /> },
              { path: ROUTES.AUTH.LOGIN, Component: LoginPage },
              { path: ROUTES.AUTH.REGISTER, Component: RegisterPage },
            ],
          },
        ],
      },
      {
        path: ROUTES.USER.BASE,
        element: <AuthGuard allowMode="authenticated" />,
        children: [{ path: ROUTES.USER.DASHBOARD, Component: DashboardPage }],
      },
    ],
  },
]);

export default router;
