import { zodResolver } from "@hookform/resolvers/zod";
import {
	FieldErrors,
	FieldValues,
	useForm,
	UseFormRegister,
	UseFormSetError
} from "react-hook-form";
import { ZodSchema } from "zod";
import styles from "./Form.module.scss";

type FormProps<T extends FieldValues> = {
	schema: ZodSchema<T>;
	onSubmit: (data: T, setError: UseFormSetError<T>) => void;
	children: (props: {
		register: UseFormRegister<T>;
		errors: FieldErrors<T>;
		setError: UseFormSetError<T>;
		isSubmitting: boolean;
	}) => React.ReactNode;
	title?: string;
};

export function Form<T extends FieldValues>({
	schema,
	onSubmit,
	children,
	title
}: FormProps<T>) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<T>({
		resolver: zodResolver(schema)
	});

	return (
		<form
			onSubmit={handleSubmit((data) => onSubmit(data, setError))}
			className={styles.form}
			noValidate>
			<fieldset disabled={isSubmitting} className={styles.fieldset}>
				{title && <legend>{title}</legend>}
				{children({ register, errors, setError, isSubmitting })}
			</fieldset>
		</form>
	);
}
