import { Link } from "react-router-dom";
import styles from "../LoginPage/Login.module.scss";

import axios from "axios";
import { Header } from "../LoginPage/Login";
import { Form } from "../../components/forms/Form/Form";
import Input from "../../components/forms/Input/Input";
import {
	registerFormSchema,
	type RegisterFormSchema
} from "../../components/forms/Form/formSchemas";
import Button from "../../components/ui/Button/Button";
import { UseFormSetError } from "react-hook-form";
import Checkbox from "../../components/forms/Checkbox/Checkbox";
import Popup from "../../components/ui/Popup/Popup";
import { useState } from "react";

const Register = () => {
	const [showSuccess, setShowSuccess] = useState(false);
	const onSubmit = async (
		data: RegisterFormSchema,
		setError: UseFormSetError<RegisterFormSchema>
	) => {
		const API_BASE_URL = import.meta.env.VITE_BASE_URL;
		const registerData = {
			email: data.email,
			password: data.password,
			companyName: data.companyName
		};

		try {
			await axios.post(API_BASE_URL + "/auth/signup", registerData);
			setShowSuccess(true);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data.includes("Firma")) {
					setError("companyName", {
						message: "Firma o podanej nazwie już istnieje."
					});
				} else {
					setError("email", {
						message: "Konto z podanym adresem email już istnieje."
					});
				}
			} else {
				console.error("Unexpected error:", error);
			}
		}
	};

	return (
		<>
			{showSuccess && (
				<Popup message='Konto zostało utworzone pomyślnie.' redirect='/login' />
			)}
			<Header />
			<Form
				schema={registerFormSchema}
				onSubmit={onSubmit}
				title='Załóż nowe konto'>
				{({ register, errors, isSubmitting }) => (
					<>
						<Input
							type='text'
							autocomplete='organization'
							name='companyName'
							placeholder='Kowalski Sp. z o.o.'
							label='Nazwa firmy'
							maxLength={25}
							register={register}
							error={errors.companyName}
						/>
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
							autocomplete='new-password'
							placeholder='•••••••••'
							label='Hasło'
							maxLength={32}
							register={register}
							error={errors.password}
						/>
						<Input
							type='password'
							autocomplete='new-password'
							name='confirmPassword'
							placeholder='•••••••••'
							label='Potwierdź hasło'
							maxLength={32}
							register={register}
							error={errors.confirmPassword}
						/>
						<Checkbox
							name='acceptTerms'
							label={
								<>
									*Potwierdzam zapoznanie się z{" "}
									<a href='/terms' target='_blank'>
										regulaminem
									</a>{" "}
									i akceptuję jego warunki
								</>
							}
							register={register}
							error={errors.acceptTerms}
						/>
						<Button
							type='submit'
							text='Zarejestruj się'
							isLoading={isSubmitting}
						/>
						<Link to='/login' className={styles.link}>
							Masz już konto?{" "}
							<span className={styles.link_href}>Zaloguj się teraz</span>
						</Link>
					</>
				)}
			</Form>
		</>
	);
};
export default Register;
