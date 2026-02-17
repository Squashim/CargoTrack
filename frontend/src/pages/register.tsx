import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '@/features/auth/components/register-form';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-pretty">{t('pages.register.title')}</CardTitle>
        <CardDescription className="text-base">{t('pages.register.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export { RegisterPage };
