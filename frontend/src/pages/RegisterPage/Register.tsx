import { Link, useNavigate } from "react-router-dom";
import styles from "../LoginPage/Login.module.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

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
				message: "Hasło musi zawierać przynajmniej jedną literę",
			})
			.regex(/\d/, { message: "Hasło musi zawierać przynajmniej jedną cyfrę" })
			.regex(/^[A-Za-z\d]+$/, {
				message: "Hasło może zawierać tylko litery i cyfry",
			}),
		confirmPassword: z.string().min(8, "Potwierdzenie hasła jest wymagane"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Hasła muszą być takie same",
	});

type FormFields = z.infer<typeof schema>;

const Register = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	});
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			const { companyName, email, password } = data;

			await axios.post("http://localhost:8080/auth/signup", {
				email,
				password,
				companyName,
			});

			alert("Zarejestrowano pomyślnie!");
			navigate("/logowanie");
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				if (error.response?.data.includes("Firma")) {
					setError("companyName", {
						message: "Istnieje firma o tej samej nazwie!",
					});
				} else {
					setError("email", {
						message: "Istnieje użytkownik o podanym adresie email!",
					});
				}
			} else {
				console.log("An unknown error occurred.");
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
				/>
				{errors.email && <p>{errors.email.message}</p>}
				<label>hasło:</label>
				<input
					{...register("password")}
					type='password'
					name='password'
					placeholder='Hasło'
				/>
				{errors.password && <p>{errors.password.message}</p>}
				<label>powtórz hasło:</label>
				<input
					{...register("confirmPassword")}
					type='password'
					name='confirmPassword'
					placeholder='Potwierdź hasło'
				/>
				{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

				<button disabled={isSubmitting} type='submit'>
					{isSubmitting ? "Ładowanie..." : "Załóż konto"}
				</button>
			</form>
			<Link to='/logowanie'>Masz już konto? Zaloguj się tutaj</Link>
		</main>
	);
};

export default Register;
