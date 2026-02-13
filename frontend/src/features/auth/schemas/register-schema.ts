import { tZod } from '@/lib/utils';
import z from 'zod';

const REGISTER_CONSTRAINTS = {
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 128,
  EMAIL_MAX_LENGTH: 254,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
};

const registerSchema = z.object({
  email: z
    .email(tZod('validation.signup.invalidEmail'))
    .max(
      REGISTER_CONSTRAINTS.EMAIL_MAX_LENGTH,
      tZod('validation.signup.emailMaxLength', { count: REGISTER_CONSTRAINTS.EMAIL_MAX_LENGTH })
    ),
  userName: z
    .string()
    .nonempty(tZod('validation.signup.usernameRequired'))
    .min(
      REGISTER_CONSTRAINTS.USERNAME_MIN_LENGTH,
      tZod('validation.signup.usernameMinLength', { count: REGISTER_CONSTRAINTS.USERNAME_MIN_LENGTH })
    )
    .max(
      REGISTER_CONSTRAINTS.USERNAME_MAX_LENGTH,
      tZod('validation.signup.usernameMaxLength', { count: REGISTER_CONSTRAINTS.USERNAME_MAX_LENGTH })
    ),
  password: z
    .string()
    .nonempty(tZod('validation.signup.passwordRequired'))
    .min(
      REGISTER_CONSTRAINTS.PASSWORD_MIN_LENGTH,
      tZod('validation.signup.passwordMinLength', { count: REGISTER_CONSTRAINTS.PASSWORD_MIN_LENGTH })
    )
    .regex(/(?=.*[A-Z])/, tZod('validation.signup.passwordUppercase'))
    .regex(/(?=.*[a-z])/, tZod('validation.signup.passwordLowercase'))
    .regex(/(?=.*\d)/, tZod('validation.signup.passwordNumber'))
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, tZod('validation.signup.passwordSpecial')),
});

const registerDefaultValues: RegisterFormValues = {
  email: '',
  userName: '',
  password: '',
};

type RegisterFormValues = z.infer<typeof registerSchema>;

export { REGISTER_CONSTRAINTS, registerDefaultValues, registerSchema, type RegisterFormValues };
