import { tZod } from '@/lib/utils';
import z from 'zod';
import { AUTH_CONSTRAINTS } from './constants';

const loginSchema = z.object({
  email: z
    .email(tZod('validation.auth.invalidEmail'))
    .max(
      AUTH_CONSTRAINTS.EMAIL_MAX_LENGTH,
      tZod('validation.auth.emailMaxLength', { count: AUTH_CONSTRAINTS.EMAIL_MAX_LENGTH })
    ),
  password: z
    .string()
    .nonempty(tZod('validation.auth.passwordRequired'))
    .min(
      AUTH_CONSTRAINTS.PASSWORD_MIN_LENGTH,
      tZod('validation.auth.passwordMinLength', { count: AUTH_CONSTRAINTS.PASSWORD_MIN_LENGTH })
    ),
});

const loginDefaultValues: LoginFormValues = {
  email: '',
  password: '',
};

type LoginFormValues = z.infer<typeof loginSchema>;

export { loginDefaultValues, loginSchema, type LoginFormValues };
