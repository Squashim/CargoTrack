import { AuthGuard } from '@/features/auth/components/auth-guard';
import { DashboardPage } from '@/pages/dashboard';
import { ErrorPage } from '@/pages/error';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { createBrowserRouter, Navigate } from 'react-router';
import App from './App';
import { AuthLayout } from './components/layout/auth-layout';
import { MainLayout } from './components/layout/main-layout';
import { ROUTES } from './lib/constants';
import { AccountPage } from './pages/account';
import { CompendiumPage } from './pages/compendium';
import { RulesPage } from './pages/rules';
import { ScoreboardPage } from './pages/scoreboard';
import { WelcomePage } from './pages/welcome';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthGuard allowMode="public" />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, Component: WelcomePage },
              {
                path: ROUTES.HOW_IT_WORKS.BASE,
                children: [
                  { path: ROUTES.HOW_IT_WORKS.RULES, Component: RulesPage },
                  { path: ROUTES.HOW_IT_WORKS.COMPENDIUM, Component: CompendiumPage },
                ],
              },
              {
                path: ROUTES.SCOREBOARD,
                Component: ScoreboardPage,
              },
            ],
          },
        ],
      },
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
        children: [
          { path: ROUTES.USER.DASHBOARD, Component: DashboardPage },
          { path: ROUTES.USER.ACCOUNT, Component: AccountPage },
        ],
      },
    ],
  },
]);

export default router;
