import { ChangeEvent } from "react";
import styles from "./Input.module.scss";

type InputProps = {
	type: "text" | "number" | "email" | "password";
	label: string;
	value: string | number;
	name: string;
	placeholder: string;
	error: boolean;
	disabled?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
	type,
	label,
	value,
	name,
	placeholder,
	error,
	disabled,
	onChange,
}: InputProps) => {
	return (
		<div className={styles.input_wrapper}>
			<label htmlFor={label}>{label}</label>
			<input
				type={type}
				id={label}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				disabled={disabled}
			/>
			{error && <p className={styles.error}>Wiadomość błędu!</p>}
		</div>
	);
};

export default Input;
