import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components/login-form';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-pretty">{t('pages.login.title')}</CardTitle>
        <CardDescription className="text-base">{t('pages.login.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export { LoginPage };
