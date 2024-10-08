import styles from "./Button.module.scss";
import React from "react";

type ButtonProps = {
	style: "primary" | "secondary";
	size?: "small" | "big";
	iconType?: "only-icon" | "icon-left" | "icon-right";
	icon?: string;
	text?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
	style,
	iconType,
	icon,
	text,
	size,
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={`${styles[style]}  ${styles.btn} ${
				iconType === "only-icon" ? styles.only_icon : ""
			} ${size && styles[size]}`}
			onClick={onClick}>
			{iconType === "icon-left" && icon && <img src={icon} alt='Ikona' />}
			{iconType !== "only-icon" && text}
			{iconType === "only-icon" && icon && <img src={icon} alt='Ikona' />}
			{iconType === "icon-right" && icon && <img src={icon} alt='Ikona' />}
		</button>
	);
};

export default Button;
