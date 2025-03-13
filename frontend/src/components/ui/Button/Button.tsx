import styles from "./Button.module.scss";
import React, { useState } from "react";

type ButtonProps = {
	type?: "button" | "submit" | "reset";
	style?: "primary" | "secondary" | "tertiary";
	size?: "small" | "normal" | "big";
	iconType?: "only-icon" | "icon-left" | "icon-right";
	icon?: string;
	text?: string;
	isLoading?: boolean;
	disabled?: boolean;
	tabIndex?: number;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
	type = "button",
	style = "primary",
	size = "normal",
	iconType,
	icon,
	text,
	isLoading,
	disabled,
	tabIndex = 0,
	onClick
}: ButtonProps) => {
	const [spanPosition, setSpanPosition] = useState({ x: 0, y: 0 });

	const showLoading = isLoading && text;
	const showIcon =
		icon &&
		(iconType === "only-icon" ||
			iconType === "icon-left" ||
			iconType === "icon-right");
	const showText = text && iconType !== "only-icon";

	const handleMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		const parentOffset = event.currentTarget.getBoundingClientRect();
		const relX = event.clientX - parentOffset.left;
		const relY = event.clientY - parentOffset.top;

		setSpanPosition({ x: relX, y: relY });
	};

	return (
		<button
			type={type}
			className={`${styles[style]}  ${styles.btn} ${iconType === "only-icon" ? styles.only_icon : ""
				} ${size && styles[size]}`}
			onClick={onClick}
			onMouseEnter={showText ? handleMouseEvent : undefined}
			onMouseLeave={showText ? handleMouseEvent : undefined}
			role='button'
			tabIndex={tabIndex}
			aria-busy={isLoading}
			disabled={disabled || isLoading}
			aria-label={
				iconType === "only-icon" && !text ? "Przycisk z ikoną" : text
			}>
			{/* Left icon */}
			{iconType === "icon-left" && showIcon && (
				<img src={icon} alt={"icon" + text} />
			)}

			{/* Button text or loading state */}
			{showLoading ? "Ładowanie..." : showText && text}

			{/* Right icon */}
			{iconType === "icon-right" && showIcon && (
				<img src={icon} alt={"icon" + text} />
			)}

			{/* Only icon */}
			{iconType === "only-icon" && showIcon && !text && (
				<img src={icon} alt={"icon" + text} />
			)}
			{showText && (
				<span
					style={
						{
							"--x": `${spanPosition.x}px`,
							"--y": `${spanPosition.y}px`
						} as React.CSSProperties
					}></span>
			)}
		</button>
	);
};

export default Button;
