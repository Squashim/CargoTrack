import { Link, useNavigate } from "react-router-dom";
import styles from "../LoginPage/Login.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z
	.object({
		companyName: z
			.string()
			.min(3, "Nazwa musi mieć co najmniej 3 znaki")
			.max(25, "Nazwa nie może mieć więcej niż 25 znaków")
			.regex(/^[A-Za-z\s.]+$/, "Nazwa może mieć tylko litery i spacje"),
		email: z.string().email("Niepoprawny adres email"),
		password: z
			.string()
			.min(8, "Hasło musi mieć co najmniej 8 znaków")
			.regex(/[A-Za-z]/, {
				message: "Hasło musi zawierać przynajmniej jedną literę"
			})
			.regex(/\d/, { message: "Hasło musi zawierać przynajmniej jedną cyfrę" })
			.regex(/^[A-Za-z\d]+$/, {
				message: "Hasło może zawierać tylko litery i cyfry"
			}),
		confirmPassword: z.string().min(8, "Potwierdzenie hasła jest wymagane")
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Hasła muszą być takie same"
	});

type FormFields = z.infer<typeof schema>;

const Register = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<FormFields>({
		resolver: zodResolver(schema)
	});
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		const API_BASE_URL = import.meta.env.VITE_BASE_URL;
		const registerData = {
			email: data.email,
			password: data.password,
			companyName: data.companyName
		};

		try {
			await axios.post(API_BASE_URL + "/auth/signup", registerData);

			alert("Zarejestrowano pomyślnie!");
			navigate("/login");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data.includes("Firma")) {
					setError("companyName", {
						message: "Istnieje firma o tej samej nazwie!"
					});
				} else {
					setError("email", {
						message: "Istnieje użytkownik o podanym adresie email!"
					});
				}
			} else {
				console.error("Unexpected error:", error);
				alert("Wystąpił błąd: Spróbuj ponownie.");
			}
		}
	};

	return (
		<main className={styles.main}>
			<h1>Rejestracja</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Nazwa firmy:</label>
				<input
					{...register("companyName")}
					type='text'
					name='companyName'
					placeholder='Firma'
				/>
				{errors.companyName && <p>{errors.companyName.message}</p>}
				<label>email:</label>
				<input
					{...register("email")}
					type='email'
					name='email'
					placeholder='Email'
					autoComplete='new-email'
				/>
				{errors.email && <p>{errors.email.message}</p>}
				<label>hasło:</label>
				<input
					{...register("password")}
					type='password'
					name='password'
					placeholder='Hasło'
					autoComplete='new-password'
				/>
				{errors.password && <p>{errors.password.message}</p>}
				<label>powtórz hasło:</label>
				<input
					{...register("confirmPassword")}
					type='password'
					name='confirmPassword'
					placeholder='Potwierdź hasło'
					autoComplete='new-password'
				/>
				{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

				<button disabled={isSubmitting} type='submit'>
					{isSubmitting ? "Ładowanie..." : "Załóż konto"}
				</button>
			</form>
			<Link to='/login'>Masz już konto? Zaloguj się tutaj</Link>
		</main>
	);
};
export default Register;
