import { Link } from "react-router-dom";
import styles from "../LoginPage/Login.module.scss";

const Register = () => {
	return (
		<main className={styles.main}>
			<h1>Rejestracja</h1>
			<form>
				<label htmlFor='username'>Nazwa użytkownika</label>
				<input type='text' name='username' id='username' />

				<label htmlFor='company_name'>Nazwa firmy</label>
				<input type='text' name='company_name' id='company_name' />

				<label htmlFor='email'>Adres email</label>
				<input type='email' name='email' id='email' />

				<label htmlFor='passw'>Hasło</label>
				<input type='password' name='password' id='passw' />

				<label htmlFor='pass_confirm'>Powtórz hasło</label>
				<input type='password' name='pass_confirm' id='pass_confirm' />

				<button type='submit'>Stwórz konto</button>
			</form>
			<Link to='/logowanie'>Masz już konto? Zaloguj się tutaj</Link>
		</main>
	);
};

export default Register;
