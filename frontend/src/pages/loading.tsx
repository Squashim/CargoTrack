import { BasicLayout } from '@/components/layout/basic-layout';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { useTranslation } from 'react-i18next';

function LoadingPage() {
  const { t } = useTranslation();

  return (
    <BasicLayout>
      <Spinner className="size-24" />
      <Typography variant="h4">{t('actions.loading')}...</Typography>
    </BasicLayout>
  );
}

export { LoadingPage };
