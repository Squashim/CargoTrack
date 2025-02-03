import { z } from "zod";

const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, "Adres email jest wymagany.")
		.email("Podaj poprawny adres e-mail, np. jan@kowalski.pl"),
	password: z
		.string()
		.min(1, "Hasło jest wymagane.")
		.min(8, "Hasło powinno mieć co najmniej 8 znaków.")
		.max(32, "Hasło może mieć maksymalnie 32 znaki.")
		.refine((value) => /[A-Za-z]/.test(value), {
			message: "Hasło musi zawierać przynajmniej jedną literę."
		})
		.refine((value) => /\d/.test(value), {
			message: "Hasło musi zawierać przynajmniej jedną cyfrę."
		})
		.refine((value) => /^[A-Za-z\d]+$/.test(value), {
			message:
				"Hasło może zawierać tylko litery i cyfry, bez znaków specjalnych."
		}),
	rememberMe: z.boolean().optional()
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const registerFormSchema = z
	.object({
		companyName: z
			.string()
			.min(1, "Nazwa firmy jest wymagana.")
			.min(3, "Nazwa firmy powinna mieć co najmniej 3 znaki.")
			.max(25, "Nazwa firmy może mieć maksymalnie 25 znaków.")
			.regex(
				/^[A-Za-z\s.]+$/,
				"Nazwa firmy może zawierać tylko litery, spacje i kropki."
			),
		email: z
			.string()
			.min(1, "Adres email jest wymagany.")
			.email("Podaj poprawny adres e-mail, np. jan@kowalski.pl"),
		password: z
			.string()
			.min(1, "Hasło jest wymagane.")
			.min(8, "Hasło powinno mieć co najmniej 8 znaków.")
			.max(32, "Hasło może mieć maksymalnie 32 znaki.")
			.regex(/[A-Za-z]/, {
				message: "Hasło musi zawierać przynajmniej jedną literę."
			})
			.regex(/\d/, { message: "Hasło musi zawierać przynajmniej jedną cyfrę." })
			.regex(/^[A-Za-z\d]+$/, {
				message:
					"Hasło może zawierać tylko litery i cyfry, bez znaków specjalnych."
			}),
		confirmPassword: z
			.string()
			.min(1, "Potwierdzenie hasła jest wymagane.")
			.min(8, "Potwierdzenie hasła jest wymagane."),
		acceptTerms: z.boolean().refine((val) => val === true, {
			message: "Musisz zaakceptować regulamin."
		})
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Podane hasła nie są identyczne."
	});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export {
	loginFormSchema,
	type LoginFormSchema,
	registerFormSchema,
	type RegisterFormSchema
};
