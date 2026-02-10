import { AuthGuard } from '@/features/auth/auth-guard';
import { DashboardPage } from '@/pages/dashboard';
import { ErrorPage } from '@/pages/error';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { WelcomePage } from '@/pages/welcome';
import { createBrowserRouter } from 'react-router';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: WelcomePage },
      {
        path: 'auth',
        element: <AuthGuard allowMode="unauthenticated" />,
        children: [
          { path: 'login', Component: LoginPage },
          { path: 'register', Component: RegisterPage },
        ],
      },
      {
        path: 'user',
        element: <AuthGuard allowMode="authenticated" />,
        children: [{ path: 'dashboard', Component: DashboardPage }],
      },
      {
        path: '*',
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
