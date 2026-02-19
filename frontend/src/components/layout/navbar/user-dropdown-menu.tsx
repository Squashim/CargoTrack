import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useLogout } from '@/features/auth/queries/use-logout';
import { NAV_AUTH_ITEMS } from '@/lib/constants';
import { LogOutIcon, User2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

function UserDropdownMenu() {
  const { t } = useTranslation(['common', 'nav']);
  const { user, isLoading, authError } = useAuth();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="icon" variant="outline" title={t('nav:userMenu.title')} aria-label={t('nav:userMenu.title')}>
            <User2 className="size-5" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={8}>
        {isLoading ? (
          <DropdownMenuItem disabled className="justify-center">
            <Spinner />
            {t('actions.loading')}...
          </DropdownMenuItem>
        ) : authError || !user ? (
          <DropdownMenuItem disabled variant="destructive" className="text-center">
            {t('errors.unknownError')}
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel
                render={
                  <Typography className="text-ellipsis line-clamp-1">
                    {`${t(`info.hello`)}, ${user.userName}!`}
                  </Typography>
                }
              />
              {NAV_AUTH_ITEMS.map((item) => (
                <DropdownMenuItem
                  disabled={logout.isPending}
                  key={item.title}
                  render={
                    <Link to={item.url}>
                      {item.icon && <item.icon className="size-5" />}
                      {t(`nav:${item.title}`)}
                    </Link>
                  }
                />
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              disabled={logout.isPending}
              closeOnClick={false}
            >
              {logout.isPending ? <Spinner /> : <LogOutIcon />}
              {logout.isPending ? t('actions.logout.pending') : t('actions.logout.base')}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserDropdownMenu };
