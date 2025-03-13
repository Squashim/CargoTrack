import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import chevron_up from "../../../assets/icons/chevron_up.svg";
import { type SelectProps } from "../../../types/types";

const Select = ({ value, options, onChange, placeholder = "Wybierz..." }: SelectProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const inputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
				setShowMenu(false);
			}
		};

		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	});

	const isSelected = (option: string) => {
		return value === option;
	};

	const handleInputClick = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className={styles.dropdown_container}>
			<div
				ref={inputRef}
				onClick={handleInputClick}
				className={styles.dropdown_input}>
				<p>{options.find((opt) => opt.value === value)?.label || placeholder}</p>
				<img
					src={chevron_up}
					className={!showMenu ? styles.translate : ""}
					alt='chevron'
				/>
			</div>
			{showMenu && (
				<div className={styles.dropdown_menu}>
					{options.map((option) => {
						return (
							<div
								key={option.value}
								onClick={() => {
									onChange(option.value);
									setShowMenu(false);
								}}
								className={`${styles.item} ${isSelected(option.value) && styles.selected
									}`}>
								{option.label}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Select;
