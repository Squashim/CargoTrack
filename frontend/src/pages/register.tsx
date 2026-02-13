import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterPage = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-pretty">Manage and build your dream transport company</CardTitle>
        <CardDescription className="text-base">Enter information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export { RegisterPage };
