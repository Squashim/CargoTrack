import { ROUTES } from '@/lib/constants';
import { Outlet, useLocation } from 'react-router';
import { Button } from '../ui/button';
import Logo from '../ui/logo';
import { ThemeToggle } from '../ui/theme-toggle';

const AuthLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.includes('login');

  const navigateTo = isLoginPage ? ROUTES.AUTH.REGISTER : ROUTES.AUTH.LOGIN;
  const navigateText = isLoginPage ? 'Register' : 'Log in';

  return (
    <main className="w-full min-h-dvh bg-radial from-primary/30 to-background flex flex-col backdrop-blur-sm">
      <div className="w-full mx-auto container flex flex-col flex-1 items-center p-4">
        <nav className="w-full flex items-center py-4 md:py-8 justify-between">
          <Logo size="lg" redirect />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" nativeButton={false} render={<a href={navigateTo}>{navigateText}</a>} />
            <ThemeToggle />
          </div>
        </nav>
        <section className="max-w-lg w-full flex-1 flex flex-col justify-center">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export { AuthLayout };
