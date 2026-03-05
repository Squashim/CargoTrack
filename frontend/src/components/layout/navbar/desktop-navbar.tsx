import Logo from '@/components/ui/logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useAuthContext } from '@/features/auth/hooks/use-auth-context';
import type { NavMenuItem } from '@/types/common';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import { DesktopActionButtons } from './action-buttons';
import { ListItem } from './list-item';

interface DesktopNavbarProps {
  menuItems: NavMenuItem[];
}

function DesktopNavbar({ menuItems }: DesktopNavbarProps) {
  return (
    <nav className="hidden lg:grid lg:grid-cols-3 w-full h-[calc(100%-1rem)] items-center mx-auto container backdrop-blur-lg bg-background/90 rounded-2xl px-4 shadow-md inset-shadow-foreground/10 inset-shadow-xs">
      <div className="flex justify-start">
        <Logo redirect />
      </div>
      <div className="flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {menuItems.map((item) => (
              <DesktopMenuItem key={item.title} item={item} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <DesktopActionButtons />
    </nav>
  );
}

function DesktopMenuItem({ item }: { item: NavMenuItem }) {
  const { t } = useTranslation(['nav']);
  const { isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();

  if (item.items) {
    const isAnyActive = item.items.some((subItem) => pathname === subItem.url);
    const visibleSubItems = item.items.filter((subItem) => subItem.allow !== 'authenticated' || isAuthenticated);

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger data-active={isAnyActive}>{t(item.title)}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-2">
            {visibleSubItems.map((subItem) => (
              <ListItem
                key={subItem.title}
                title={t(subItem.title)}
                href={subItem.url}
                icon={subItem.icon}
                isActive={pathname === subItem.url}
              >
                {t(subItem.description)}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuLink
      data-active={pathname === item.url}
      className={navigationMenuTriggerStyle()}
      render={<Link to={item.url}>{t(item.title)}</Link>}
    />
  );
}

export { DesktopNavbar };
