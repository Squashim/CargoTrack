import { ROUTES } from '@/lib/constants';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { LanguageSelect } from '../ui/language-select';
import Logo from '../ui/logo';
import { ThemeToggle } from '../ui/theme-toggle';

const AuthLayout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const isLoginPage = location.pathname.includes('login');

  const navigateTo = isLoginPage ? ROUTES.AUTH.REGISTER : ROUTES.AUTH.LOGIN;
  const navigateText = isLoginPage ? t('actions.signup.navbar') : t('actions.login.navbar');

  return (
    <main className="w-full min-h-dvh bg-radial from-primary/30 to-background flex flex-col backdrop-blur-sm">
      <div className="w-full mx-auto container flex flex-col flex-1 items-center p-4">
        <nav className="w-full flex items-center py-4 md:py-6 justify-between">
          <Logo size="lg" redirect />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" nativeButton={false} render={<a href={navigateTo}>{navigateText}</a>} />
            <ThemeToggle />
          </div>
        </nav>
        <section className="max-w-lg w-full flex-1 flex flex-col justify-center">
          <Outlet />
        </section>
        <footer className="w-full flex items-center justify-end">
          <LanguageSelect />
        </footer>
      </div>
    </main>
  );
};

export { AuthLayout };
