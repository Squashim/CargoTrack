import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";

import chevron_up from "../../assets/icons/chevron_up.svg";
import { ScoreData } from "../../types/types";

type SelectProps = {
	value: string;
	options: ScoreData[];
	onChange: (value: string) => void;
};

const monthTranslation: Record<string, string> = {
	january: "styczeń",
	february: "luty",
	march: "marzec",
	april: "kwiecień",
	may: "maj",
	june: "czerwiec",
	july: "lipiec",
	august: "sierpień",
	september: "wrzesień",
	october: "październik",
	november: "listopad",
	december: "grudzień",
};

const Select = ({ value, options, onChange }: SelectProps) => {
	const [showMenu, setShowMenu] = useState(false);
	const inputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
				setShowMenu(false);
			}
		};

		window.addEventListener("click", handler);
		return () => {
			window.removeEventListener("click", handler);
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
				<p>{monthTranslation[value]}</p>
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
								key={option.month}
								onClick={() => onChange(option.month)}
								className={`${styles.item} ${
									isSelected(option.month) && styles.selected
								}`}>
								{monthTranslation[option.month]}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Select;
