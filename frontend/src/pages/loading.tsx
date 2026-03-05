import { BasicLayout } from '@/components/layout/basic-layout';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import type { WithClassName } from '@/types/common';
import { useTranslation } from 'react-i18next';

type LoadingPageProps = WithClassName;

function LoadingPage({ className }: LoadingPageProps) {
  const { t } = useTranslation();

  return (
    <BasicLayout className={className}>
      <Spinner className="size-24" />
      <Typography variant="h4">{t('actions.loading')}...</Typography>
    </BasicLayout>
  );
}

export { LoadingPage };
