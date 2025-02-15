import { Link } from "react-router-dom";
import { UseFormSetError } from "react-hook-form";
import axios from "axios";
import ChevronLeft from "../../assets/icons/chevron_left.svg";

import {
	loginFormSchema,
	type LoginFormSchema
} from "../../components/forms/Form/formSchemas";
import { Form } from "../../components/forms/Form/Form";
import Input from "../../components/forms/Input/Input";
import Checkbox from "../../components/forms/Checkbox/Checkbox";
import Button from "../../components/ui/Button/Button";
import Logo from "../../components/ui/Logo/Logo";
import styles from "./Login.module.scss";
import Popup from "../../components/ui/Popup/Popup";
import { useState } from "react";

export const Header = () => {
	const handleRedirect = () => {
		window.history.back();
	};

	return (
		<header className={styles.header}>
			<div className={styles.header_wrapper}>
				<Logo />
				<Button
					iconType='only-icon'
					icon={ChevronLeft}
					style='secondary'
					onClick={handleRedirect}
				/>
			</div>
		</header>
	);
};

const Login = () => {
	const [showSuccess, setShowSuccess] = useState(false);
	const onSubmit = async (
		data: LoginFormSchema,
		setError: UseFormSetError<LoginFormSchema>
	) => {
		const API_BASE_URL = import.meta.env.VITE_BASE_URL;
		const { email, password, rememberMe } = data;
		axios.defaults.withCredentials = true;

		try {
			await axios.post(API_BASE_URL + "/auth/login", {
				email,
				password,
				isRememberChecked: rememberMe
			});
			setShowSuccess(true);
		} catch (error) {
			setError("email", {
				message: "Podano nieprawidłowy adres email lub hasło."
			});
		}
	};

	return (
		<>
			{showSuccess && (
				<Popup message='Zalogowano pomyślnie.' redirect='/user/dashboard' />
			)}
			<Header />
			<Form
				schema={loginFormSchema}
				onSubmit={onSubmit}
				title='Zaloguj się do swojego konta'>
				{({ register, errors, isSubmitting }) => (
					<>
						<Input
							type='email'
							name='email'
							autocomplete='email'
							placeholder='jan@kowalski.pl'
							label='Adres email'
							maxLength={64}
							register={register}
							error={errors.email}
						/>
						<Input
							type='password'
							name='password'
							autocomplete='current-password'
							placeholder='•••••••••'
							label='Hasło'
							maxLength={32}
							register={register}
							error={errors.password}
						/>
						<Checkbox
							name='rememberMe'
							label='Zapamiętaj mnie'
							register={register}
						/>
						<Button type='submit' text='Zaloguj się' isLoading={isSubmitting} />
						<Link to='/register' className={styles.link}>
							Nie masz konta?{" "}
							<span className={styles.link_href}>Załóż teraz</span>
						</Link>
					</>
				)}
			</Form>
		</>
	);
};

export default Login;
