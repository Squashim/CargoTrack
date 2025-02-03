import styles from "./Input.module.scss";
import {
	FieldError,
	FieldValues,
	Path,
	UseFormRegister
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
	type: "text" | "number" | "email" | "password";
	label: string;
	name: Path<T>;
	placeholder: string;
	disabled?: boolean;
	register: UseFormRegister<T>;
	error?: FieldError;
	maxLength?: number;
};

const Input = <T extends FieldValues>({
	type,
	label,
	name,
	placeholder,
	disabled,
	register,
	error,
	maxLength
}: InputProps<T>) => {
	return (
		<div className={styles.input_wrapper}>
			<label htmlFor={name as string} className={styles.input_label}>
				{label}
			</label>
			<input
				maxLength={maxLength}
				{...register(name)}
				type={type}
				id={name as string}
				placeholder={placeholder}
				disabled={disabled}
				className={styles.input}
			/>
			{error && <p className={styles.error}>{error.message}</p>}
		</div>
	);
};

export default Input;
