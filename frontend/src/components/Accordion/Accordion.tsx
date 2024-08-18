import { useRef, useState } from "react";
import styles from "./Accordion.module.scss";

import plus from "../../assets/icons/plus.svg";
import minus from "../../assets/icons/minus.svg";

const data = [
	{
		question: "Jak mogę założyć konto?",
		answer:
			'Aby założyć konto, kliknij przycisk "Rozpocznij zabawę" na stronie głównej, a następnie wypełnij formularz rejestracyjny podając swoje dane.',
	},
	{
		question: "Co zrobić jeśli zapomniałem hasła?",
		answer:
			"W przypadku utraty hasła na twój adres email zostanie wysłany kod, który pozwoli na zmianę hasła.",
	},
	{
		question: "Jak mogę rywalizować z innymi użytkownikami?",
		answer:
			"Rywalizacja z innymi graczami rozpoczyna się od momentu założenia konta. Im większe saldo na Twoim koncie tym wyżej będziesz w rankingu.",
	},
	{
		question: "Jak mogę śledzić swoje postępy w rywalizacjach?",
		answer:
			"Tablica wyników z najlepszymi graczami znajduje się na stronie głównej, natomiast swoją pozycję w rankingu możesz zobaczyć po zalogowaniu na swoje konto w panelu głównym, w zakładce 'Ranking'.",
	},
	{
		question: "Czy korzystanie ze strony jest darmowe?",
		answer:
			"Tak, wszystkie treści które prezentujemy na stronie są dostępne za darmo dla wszystkich użytkowników.",
	},
	{
		question: "Gdzie mogę zgłosić błąd lub uzyskać pomoc?",
		answer:
			"Na wszystkie pytania i znalezione błędy chętnie odpowiemy po adresem mailowym: pomoc@cargotrack.com Z góry dziękujemy.",
	},
];

type AccordionItemProps = {
	question: string;
	answer: string;
	isOpen: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AccordionItem = ({
	question,
	answer,
	isOpen,
	onClick,
}: AccordionItemProps) => {
	const contentHeight = useRef<HTMLDivElement>(null);

	return (
		<div className={styles.wrapper}>
			<button
				onClick={onClick}
				className={`${styles.question_container} ${
					isOpen ? styles.active : ""
				}`}>
				<p>{question}</p>
				<img
					src={isOpen ? minus : plus}
					alt={`${isOpen ? minus : plus} icon`}
				/>
			</button>
			<div
				ref={contentHeight}
				className={styles.answer_container}
				style={
					isOpen
						? { height: contentHeight.current?.scrollHeight }
						: { height: "0px" }
				}>
				<p className={styles.content}>{answer}</p>
			</div>
		</div>
	);
};

const Accordion = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const handleItemClick = (index: number) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div className={styles.accordion_container}>
			{data.map((item, index) => (
				<AccordionItem
					key={index}
					question={item.question}
					answer={item.answer}
					isOpen={activeIndex === index}
					onClick={() => handleItemClick(index)}
				/>
			))}
		</div>
	);
};

export default Accordion;
