import { BasicLayout } from '@/components/layout/basic-layout';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ROUTES } from '@/lib/constants';
import { isAxiosError } from 'axios';
import { RotateCw, WifiOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

interface ErrorPageProps {
  error?: unknown;
  onRetry?: () => void;
}

function ErrorPage({ onRetry, error: propError }: ErrorPageProps = {}) {
  const routeError = useRouteError();
  const error = propError ?? routeError;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isNetworkError =
    (isAxiosError(error) && (error.code === 'ERR_NETWORK' || !error.response)) ||
    (error instanceof Error && error.message.toLowerCase().includes('network'));

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleHome = () => navigate(ROUTES.HOME);

  if (isNetworkError) {
    return (
      <BasicLayout>
        <WifiOff size={48} className="text-muted-foreground" />
        <Typography variant="h1" className="max-w-sm text-pretty text-center">
          {t('errors.networkError')}
        </Typography>
        <Button onClick={handleRetry} size="lg" data-icon="inline-start">
          <RotateCw />
          {t('actions.retry')}
        </Button>
      </BasicLayout>
    );
  }

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <BasicLayout>
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">{t('errors.pageNotFound')}</Typography>
        <Button onClick={handleHome} size="lg">
          {t('actions.goHome')}
        </Button>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <Typography variant="h1">{t('errors.unknownError')}</Typography>
      <Button onClick={handleRetry} size="lg">
        {t('actions.refreshPage')}
      </Button>
    </BasicLayout>
  );
}

export { ErrorPage };
