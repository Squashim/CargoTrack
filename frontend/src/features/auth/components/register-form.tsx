import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useRegisterQuery } from '../queries/use-register-query';
import { AUTH_CONSTRAINTS } from '../schemas/constraints';
import { registerDefaultValues, registerSchema, type RegisterFormValues } from '../schemas/register-schema';

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setError, ...form } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
  const { t } = useTranslation(['common', 'auth']);
  const { register } = useRegisterQuery({ setError });

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

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
              <FieldLabel htmlFor="form-signup-username">{t('auth:form.username.label')}</FieldLabel>
              <FieldDescription>{t('auth:form.username.description')}</FieldDescription>
              <Input
                {...field}
                id="form-signup-username"
                type="text"
                minLength={AUTH_CONSTRAINTS.USERNAME_MIN_LENGTH}
                maxLength={AUTH_CONSTRAINTS.USERNAME_MAX_LENGTH}
                aria-invalid={fieldState.invalid}
                placeholder={t('auth:form.username.placeholder')}
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
              <FieldLabel htmlFor="form-signup-email"> {t('auth:form.email.label')}</FieldLabel>
              <Input
                {...field}
                id="form-signup-email"
                type="email"
                maxLength={AUTH_CONSTRAINTS.EMAIL_MAX_LENGTH}
                aria-invalid={fieldState.invalid}
                placeholder={t('auth:form.email.placeholder')}
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
              <FieldLabel htmlFor="form-signup-password"> {t('auth:form.password.label')}</FieldLabel>
              <FieldDescription>{t('auth:form.password.description')}</FieldDescription>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="form-signup-password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  aria-invalid={fieldState.invalid}
                  minLength={AUTH_CONSTRAINTS.PASSWORD_MIN_LENGTH}
                  maxLength={AUTH_CONSTRAINTS.PASSWORD_MAX_LENGTH}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  disabled={register.isPending}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={togglePasswordVisibility}
                    type="button"
                    disabled={register.isPending}
                    aria-label={isPasswordVisible ? t('actions.password.hide') : t('actions.password.show')}
                    title={isPasswordVisible ? t('actions.password.hide') : t('actions.password.show')}
                  >
                    {isPasswordVisible ? <Eye /> : <EyeOff />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <FieldDescription className="text-center">
            <Trans
              t={t}
              i18nKey="auth:form.terms"
              components={[<a href={ROUTES.HOME}>Terms</a>, <a href={ROUTES.HOME}>Privacy policy</a>]}
            />
          </FieldDescription>
          <Button type="submit" form="form-signup" size="lg" disabled={register.isPending}>
            {register.isPending && <Spinner data-icon="inline-start" />}
            {register.isPending ? t('actions.signup.pending') : t('actions.signup.base')}
          </Button>
          <FieldDescription className="max-w-sm text-center mx-auto text-base pt-4">
            <Trans t={t} i18nKey="auth:form.haveAccount" components={[<a href={ROUTES.AUTH.LOGIN}>Log in</a>]} />
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export { RegisterForm };
