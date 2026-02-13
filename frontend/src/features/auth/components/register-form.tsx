import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { ROUTES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRegister } from '../queries/use-register';
import {
  REGISTER_CONSTRAINTS,
  registerDefaultValues,
  registerSchema,
  type RegisterFormValues,
} from '../schemas/register-schema';

const RegisterForm = () => {
  const { setError, ...form } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });
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
              <FieldLabel htmlFor="form-signup-username">Username</FieldLabel>
              <FieldDescription>Must be at least 3 characters.</FieldDescription>
              <Input
                {...field}
                id="form-signup-username"
                type="text"
                minLength={REGISTER_CONSTRAINTS.USERNAME_MIN_LENGTH}
                maxLength={REGISTER_CONSTRAINTS.USERNAME_MAX_LENGTH}
                aria-invalid={fieldState.invalid}
                placeholder="tomsmith"
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
              <FieldLabel htmlFor="form-signup-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-signup-email"
                type="email"
                maxLength={REGISTER_CONSTRAINTS.EMAIL_MAX_LENGTH}
                aria-invalid={fieldState.invalid}
                placeholder="tomsmith@gmail.com"
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
              <FieldLabel htmlFor="form-signup-password">Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters and include uppercase, lowercase, number and special character.
              </FieldDescription>
              <Input
                {...field}
                id="form-signup-password"
                type="password"
                aria-invalid={fieldState.invalid}
                minLength={REGISTER_CONSTRAINTS.PASSWORD_MIN_LENGTH}
                maxLength={REGISTER_CONSTRAINTS.PASSWORD_MAX_LENGTH}
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
            By clicking submit, you agree to our <a href={ROUTES.HOME}>Terms of Service</a> and{' '}
            <a href={ROUTES.HOME}>Privacy Policy</a>.
          </FieldDescription>
          <Button type="submit" form="form-signup" size="lg" disabled={register.isPending}>
            {register.isPending && <Spinner data-icon="inline-start" />}
            {register.isPending ? 'Submitting...' : 'Submit'}
          </Button>
          <FieldDescription className="max-w-sm text-center mx-auto text-base pt-4">
            Already have an account? <a href={ROUTES.AUTH.LOGIN}>Log in</a>.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export { RegisterForm };
