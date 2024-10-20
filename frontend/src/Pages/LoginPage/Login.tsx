import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useLayoutEffect } from "react";

const schema = z.object({
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
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
	const { authState } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(schema),
	});

	useLayoutEffect(() => {
		if (authState) {
			navigate("/panel");
		}
	}, [authState]);

	const onSubmit: SubmitHandler<FormFields> = async (data) => {
		try {
			const { email, password } = data;

			axios.defaults.withCredentials = true;

			await axios.post("http://localhost:8080/auth/login", {
				email,
				password,
			});

			navigate("/panel");
			alert("Zalogowano pomyślnie!");
		} catch (error) {
			setError("email", {
				message: "Nieprawidłowy email lub hasło",
			});
		}
	};
	return (
		<main className={styles.main}>
			<h1>Logowanie</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Nazwa firmy:</label>
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

				<button disabled={isSubmitting} type='submit'>
					{isSubmitting ? "Ładowanie..." : "Zaloguj się"}
				</button>
			</form>
			<Link to='/rejestracja'>Nie masz konta? Załóż je tutaj</Link>
		</main>
	);
};

export default Login;
