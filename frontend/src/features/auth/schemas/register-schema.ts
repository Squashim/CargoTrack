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
    .email('Please enter a valid email address.')
    .max(REGISTER_CONSTRAINTS.EMAIL_MAX_LENGTH, 'Email must be at most 254 characters.'),
  userName: z
    .string()
    .nonempty('Username is required.')
    .min(REGISTER_CONSTRAINTS.USERNAME_MIN_LENGTH, 'Username must be at least 3 characters.')
    .max(REGISTER_CONSTRAINTS.USERNAME_MAX_LENGTH, 'Username must be at most 128 characters.'),
  password: z
    .string()
    .nonempty('Password is required.')
    .min(REGISTER_CONSTRAINTS.PASSWORD_MIN_LENGTH, 'Password must be at least 8 characters.')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter.')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter.')
    .regex(/(?=.*\d)/, 'Password must contain at least one number.')
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, 'Password must contain at least one special character.'),
});

const registerDefaultValues: RegisterFormValues = {
  email: 'admin@admin.com',
  userName: 'admin',
  password: 'Admin12345678!',
};

type RegisterFormValues = z.infer<typeof registerSchema>;

export { REGISTER_CONSTRAINTS, registerDefaultValues, registerSchema, type RegisterFormValues };
