import { Link } from "react-router-dom";
import styles from "../LoginPage/Login.module.scss";

import useInput from "../../hooks/useInput";
import Input from "../../components/Input/Input";
import { FormEvent } from "react";

const Register = () => {
	const companyNameInput = useInput("");
	const emailInput = useInput("");
	const passwordInput = useInput("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		validateInput(companyNameInput);
		validateInput(emailInput);
		validateInput(passwordInput);
	};

	const validateInput = (input: {
		value: string;
		setError: (value: boolean) => void;
	}) => {
		if (!input.value.trim()) {
			input.setError(true);
		} else {
			input.setError(false);
		}
	};

	return (
		<main className={styles.main}>
			<h1>Rejestracja</h1>
			<form onSubmit={handleSubmit}>
				<Input
					type='text'
					label='Nazwa'
					name='name'
					placeholder='Wpisz nazwę'
					{...companyNameInput}
				/>
				<Input
					type='email'
					label='Email'
					name='email'
					placeholder='Wpisz email'
					{...emailInput}
				/>
				<Input
					type='password'
					label='Hasło'
					name='password'
					placeholder='Wpisz hasło'
					{...passwordInput}
				/>

				<button type='submit'>Wyślij</button>

				{/* <label htmlFor='company_name'>Nazwa firmy</label>
				<input type='text' name='company_name' id='company_name' />

				<label htmlFor='email'>Adres email</label>
				<input type='email' name='email' id='email' />

				<label htmlFor='passw'>Hasło</label>
				<input type='password' name='password' id='passw' />

				<label htmlFor='pass_confirm'>Powtórz hasło</label>
				<input type='password' name='pass_confirm' id='pass_confirm' />

				<button type='submit'>Stwórz konto</button> */}
			</form>
			<Link to='/logowanie'>Masz już konto? Zaloguj się tutaj</Link>
		</main>
	);
};

export default Register;
