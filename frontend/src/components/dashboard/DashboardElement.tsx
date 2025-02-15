import styles from "./DashboardElement.module.scss";
import { useDashboard } from "../../hooks/useDashboard";
import CloseIcon from "../../assets/icons/close.svg";
import Button from "../ui/Button/Button";

type DashboardElementProps = {
	title: string;
	slug: string;
};

const DashboardElement = ({ title, slug }: DashboardElementProps) => {
	const { isSidebarOpen, activeDashboardElement, setActiveDashboardElement } =
		useDashboard();

	return (
		<section
			className={`${styles.dashboard_element_wrapper} ${
				isSidebarOpen ? styles.sidebar_open : ""
			} ${activeDashboardElement === slug ? styles.active : ""}`}>
			<h1>{title}</h1>
			<Button
				icon={CloseIcon}
				iconType='only-icon'
				style='secondary'
				onClick={() => setActiveDashboardElement(null)}
			/>

			{/* Zawartosc poszczegolnych elementow */}
		</section>
	);
};

export default DashboardElement;
