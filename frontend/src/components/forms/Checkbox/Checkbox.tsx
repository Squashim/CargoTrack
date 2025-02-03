import {
	FieldError,
	FieldValues,
	Path,
	UseFormRegister
} from "react-hook-form";
import styles from "./Checkbox.module.scss";

type CheckboxProps<T extends FieldValues> = {
	label: React.ReactNode | string;
	name: Path<T>;
	register: UseFormRegister<T>;
	error?: FieldError;
};

const Checkbox = <T extends FieldValues>({
	label,
	name,
	register,
	error
}: CheckboxProps<T>) => {
	return (
		<div className={styles.checkbox_wrapper}>
			<div className={styles.checkbox_container}>
				<input
					type='checkbox'
					id={name as string}
					{...register(name)}
					className={styles.checkbox_input}
					tabIndex={0}
					role='checkbox'
					aria-checked='false'
				/>
				<label className={styles.checkbox_label} htmlFor={name as string}>
					{label}
				</label>
			</div>
			{error && <p className={styles.error}>{error.message}</p>}
		</div>
	);
};

export default Checkbox;
