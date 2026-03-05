import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Typography } from '@/components/ui/typography';
import { useAuthContext } from '@/features/auth/hooks/use-auth-context';
import { useLogoutQuery } from '@/features/auth/queries/use-logout-query';
import { NAV_AUTH_ITEMS, ROUTES } from '@/lib/constants';
import { LogIn, LogOutIcon, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import { ListItem } from './list-item';
import { UserDropdownMenu } from './user-dropdown-menu';

function DesktopActionButtons() {
  const { isAuthenticated } = useAuthContext();
  const { t } = useTranslation(['common', 'nav']);
  const { pathname } = useLocation();

  const isDashboard = pathname.startsWith(ROUTES.USER.DASHBOARD);

  return (
    <div className="flex items-center gap-2 justify-end">
      {isAuthenticated ? (
        <>
          {!isDashboard && (
            <Button nativeButton={false} render={<Link to={ROUTES.USER.DASHBOARD}>{t('nav:dashboard.title')}</Link>} />
          )}
          <UserDropdownMenu />
        </>
      ) : (
        <>
          <Button
            variant="outline"
            size="icon"
            title={t('actions.login.navbar')}
            aria-label={t('actions.login.navbar')}
            nativeButton={false}
            render={
              <Link to={ROUTES.AUTH.LOGIN}>
                <LogIn />
              </Link>
            }
          />
          <Button nativeButton={false} render={<Link to={ROUTES.AUTH.REGISTER}>{t('actions.signup.navbar')}</Link>} />
        </>
      )}

      <ThemeToggle size="icon" className="ml-2" variant="ghost" />
    </div>
  );
}

function MobileActionButtons() {
  const { isAuthenticated, user, isLoading, authError } = useAuthContext();
  const { pathname } = useLocation();
  const { logout } = useLogoutQuery();
  const { t } = useTranslation(['common', 'nav']);

  const isDashboard = pathname.startsWith(ROUTES.USER.DASHBOARD);

  const handleLogout = () => {
    logout.mutate();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col gap-4 flex-1 justify-end">
        <ThemeToggle size="icon-lg" variant="ghost" showTooltip={false} />
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={
            <Link to={ROUTES.AUTH.LOGIN}>
              <LogIn />
              {t('actions.login.navbar')}
            </Link>
          }
        />
        <Button
          nativeButton={false}
          size="lg"
          render={<Link to={ROUTES.AUTH.REGISTER}>{t('actions.signup.navbar')}</Link>}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1 justify-end">
      <ThemeToggle size="icon-lg" variant="ghost" showTooltip={false} />

      <Separator />

      {isLoading ? (
        <div className="flex gap-2 items-center">
          <Spinner />
          <Typography className="text-muted-foreground text-sm">{t('actions.loading')}...</Typography>
        </div>
      ) : authError || !user ? (
        <Typography className="text-destructive text-sm">{t('errors.unknownError')}</Typography>
      ) : (
        <Typography className="text-ellipsis line-clamp-1 text-muted-foreground text-sm">{`${t(`info.hello`)}, ${user.userName}!`}</Typography>
      )}

      <ul className="grid gap-2">
        {NAV_AUTH_ITEMS.map((item) => (
          <ListItem
            key={item.title}
            title={t(`nav:${item.title}`)}
            href={item.url}
            icon={item.icon}
            isMobile
            isActive={pathname === item.url}
          />
        ))}
      </ul>

      {!isDashboard && (
        <Button
          size="lg"
          nativeButton={false}
          render={<Link to={ROUTES.USER.DASHBOARD}>{t('nav:dashboard.title')}</Link>}
        />
      )}

      {isLoading ? (
        <Button data-icon="inline-start" variant="secondary" size="lg" disabled className="w-full">
          <Spinner />
          {t('actions.loading')}...
        </Button>
      ) : authError || !user ? (
        <Button
          onClick={window.location.reload}
          data-icon="inline-start"
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <RefreshCw />
          {t('actions.refreshPage')}
        </Button>
      ) : (
        <Button
          onClick={handleLogout}
          disabled={logout.isPending}
          data-icon="inline-start"
          variant="destructive"
          size="lg"
          className="w-full"
        >
          {logout.isPending ? <Spinner /> : <LogOutIcon />}
          {logout.isPending ? t('actions.logout.pending') : t('actions.logout.base')}
        </Button>
      )}
    </div>
  );
}

export { DesktopActionButtons, MobileActionButtons };
