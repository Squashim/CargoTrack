import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircleIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useLogin } from '../queries/use-login';
import { AUTH_CONSTRAINTS } from '../schemas/constants';
import { loginDefaultValues, loginSchema, type LoginFormValues } from '../schemas/login-schema';

function LoginForm() {
  const {
    setError,
    formState: { errors },
    ...form
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });
  const { t } = useTranslation();
  const { login } = useLogin({ setError });

  function onSubmit(data: LoginFormValues) {
    login.mutate(data);
  }

  return (
    <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {errors.root && (
          <Alert variant="destructive" className="border-destructive/50">
            <AlertCircleIcon />
            <AlertTitle>
              <FieldError errors={[errors.root]} />
            </AlertTitle>
          </Alert>
        )}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-email"> {t('form.auth.email.label')}</FieldLabel>
              <Input
                {...field}
                id="form-login-email"
                type="email"
                maxLength={AUTH_CONSTRAINTS.EMAIL_MAX_LENGTH}
                aria-invalid={fieldState.invalid}
                placeholder={t('form.auth.email.placeholder')}
                autoComplete="email"
                disabled={login.isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-password"> {t('form.auth.password.label')}</FieldLabel>
              <Input
                {...field}
                id="form-login-password"
                type="password"
                aria-invalid={fieldState.invalid}
                minLength={AUTH_CONSTRAINTS.PASSWORD_MIN_LENGTH}
                maxLength={AUTH_CONSTRAINTS.PASSWORD_MAX_LENGTH}
                placeholder="••••••••••••"
                autoComplete="current-password"
                disabled={login.isPending}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" form="form-login" size="lg" disabled={login.isPending}>
            {login.isPending && <Spinner data-icon="inline-start" />}
            {login.isPending ? t('actions.login.pending') : t('actions.login.base')}
          </Button>
          <FieldDescription className="max-w-sm text-center mx-auto text-base pt-4">
            <Trans t={t} i18nKey="form.auth.dontHaveAccount" components={[<a href={ROUTES.AUTH.REGISTER}>Sign </a>]} />
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export { LoginForm };
