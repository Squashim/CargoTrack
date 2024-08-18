import styles from "./Step.module.scss";
type StepProps = {
	icon: string;
	caption: string;
	title: string;
	content: string;
};

const Step = (props: StepProps) => {
	const match = props.icon.match(/\/([\w-]+)\.svg$/);
	return (
		<div className={styles.step}>
			<header className={styles.header}>
				<img src={props.icon} alt={`${match && match[1]} icon`} />
				<div className={styles.wrapper}>
					<span>{props.caption}</span>
					<h3>{props.title}</h3>
				</div>
			</header>
			<p>{props.content}</p>
		</div>
	);
};

export default Step;
