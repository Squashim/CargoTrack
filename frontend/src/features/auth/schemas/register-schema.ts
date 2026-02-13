import { tZod } from '@/lib/utils';
import z from 'zod';
import { AUTH_CONSTRAINTS } from './constants';

const registerSchema = z.object({
  email: z
    .email(tZod('validation.auth.invalidEmail'))
    .max(
      AUTH_CONSTRAINTS.EMAIL_MAX_LENGTH,
      tZod('validation.auth.emailMaxLength', { count: AUTH_CONSTRAINTS.EMAIL_MAX_LENGTH })
    ),
  userName: z
    .string()
    .nonempty(tZod('validation.auth.usernameRequired'))
    .min(
      AUTH_CONSTRAINTS.USERNAME_MIN_LENGTH,
      tZod('validation.auth.usernameMinLength', { count: AUTH_CONSTRAINTS.USERNAME_MIN_LENGTH })
    )
    .max(
      AUTH_CONSTRAINTS.USERNAME_MAX_LENGTH,
      tZod('validation.auth.usernameMaxLength', { count: AUTH_CONSTRAINTS.USERNAME_MAX_LENGTH })
    ),
  password: z
    .string()
    .nonempty(tZod('validation.auth.passwordRequired'))
    .min(
      AUTH_CONSTRAINTS.PASSWORD_MIN_LENGTH,
      tZod('validation.auth.passwordMinLength', { count: AUTH_CONSTRAINTS.PASSWORD_MIN_LENGTH })
    )
    .regex(/(?=.*[A-Z])/, tZod('validation.auth.passwordUppercase'))
    .regex(/(?=.*[a-z])/, tZod('validation.auth.passwordLowercase'))
    .regex(/(?=.*\d)/, tZod('validation.auth.passwordNumber'))
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, tZod('validation.auth.passwordSpecial')),
});

const registerDefaultValues: RegisterFormValues = {
  email: '',
  userName: '',
  password: '',
};

type RegisterFormValues = z.infer<typeof registerSchema>;

export { registerDefaultValues, registerSchema, type RegisterFormValues };
