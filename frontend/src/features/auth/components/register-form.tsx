import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useRegister } from '../queries/use-register';
import { AUTH_CONSTRAINTS } from '../schemas/constants';
import { registerDefaultValues, registerSchema, type RegisterFormValues } from '../schemas/register-schema';

const RegisterForm = () => {
  const { setError, ...form } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
  const { t } = useTranslation();
  const { register } = useRegister({ setError });

  function onSubmit(data: RegisterFormValues) {
    register.mutate(data);
  }

  return (
    <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="userName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signup-username">{t('form.auth.username.label')}</FieldLabel>
              <FieldDescription>{t('form.auth.username.description')}</FieldDescription>
              <Input
                {...field}
                id="form-signup-username"
                type="text"
                minLength={AUTH_CONSTRAINTS.USERNAME_MIN_LENGTH}
                maxLength={AUTH_CONSTRAINTS.USERNAME_MAX_LENGTH}
                aria-invalid={fieldState.invalid}
                placeholder={t('form.auth.username.placeholder')}
                autoComplete="username"
                disabled={register.isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-signup-email"> {t('form.auth.email.label')}</FieldLabel>
              <Input
                {...field}
                id="form-signup-email"
                type="email"
                maxLength={AUTH_CONSTRAINTS.EMAIL_MAX_LENGTH}
                aria-invalid={fieldState.invalid}
                placeholder={t('form.auth.email.placeholder')}
                autoComplete="email"
                disabled={register.isPending}
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
              <FieldLabel htmlFor="form-signup-password"> {t('form.auth.password.label')}</FieldLabel>
              <FieldDescription>{t('form.auth.password.description')}</FieldDescription>
              <Input
                {...field}
                id="form-signup-password"
                type="password"
                aria-invalid={fieldState.invalid}
                minLength={AUTH_CONSTRAINTS.PASSWORD_MIN_LENGTH}
                maxLength={AUTH_CONSTRAINTS.PASSWORD_MAX_LENGTH}
                placeholder="••••••••••••"
                autoComplete="new-password"
                disabled={register.isPending}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <FieldDescription className="text-center">
            <Trans
              t={t}
              i18nKey="form.auth.terms"
              components={[<a href={ROUTES.HOME}>Terms</a>, <a href={ROUTES.HOME}>Privacy policy</a>]}
            />
          </FieldDescription>
          <Button type="submit" form="form-signup" size="lg" disabled={register.isPending}>
            {register.isPending && <Spinner data-icon="inline-start" />}
            {register.isPending ? t('actions.signup.pending') : t('actions.signup.base')}
          </Button>
          <FieldDescription className="max-w-sm text-center mx-auto text-base pt-4">
            <Trans t={t} i18nKey="form.auth.haveAccount" components={[<a href={ROUTES.AUTH.LOGIN}>Log in</a>]} />
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export { RegisterForm };
