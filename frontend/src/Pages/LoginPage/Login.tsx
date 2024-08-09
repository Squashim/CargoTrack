import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
	return (
		<main className={styles.main}>
			<h1>Logowanie</h1>
			<form>
				<label htmlFor='email'>Adres email</label>
				<input type='email' name='email' id='email' />
				<label htmlFor='pass'>Hasło</label>
				<input type='password' name='password' id='pass' />

				<button type='submit'>Zaloguj</button>
			</form>
			<Link to='/rejestracja'>Nie masz konta? Załóż je tutaj</Link>
		</main>
	);
};

export default Login;
