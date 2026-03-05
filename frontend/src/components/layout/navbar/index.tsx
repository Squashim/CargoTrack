import { useAuthContext } from '@/features/auth/hooks/use-auth-context';
import { NAV_MENU_ITEMS } from '@/lib/constants';
import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';

function Navbar() {
  const { isAuthenticated } = useAuthContext();

  const filteredMenuItems = NAV_MENU_ITEMS.filter((item) => {
    if (item.allow === 'authenticated' && !isAuthenticated) {
      return false;
    }
    if (item.allow === 'unauthenticated' && isAuthenticated) {
      return false;
    }
    return true;
  });

  return (
    <header className="w-full h-20 sticky top-4 z-50 px-4 md:px-8">
      <DesktopNavbar menuItems={filteredMenuItems} />
      <MobileNavbar menuItems={filteredMenuItems} />
    </header>
  );
}

export { Navbar };
