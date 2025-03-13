import styles from "./DashboardElement.module.scss";
import { useDashboard } from "../../hooks/useDashboard";
import CloseIcon from "../../assets/icons/close.svg";
import Button from "../ui/Button/Button";
import DashboardViewList from "./DashboardViewList";

type DashboardElementProps = {
	title: string;
	slug: string;
};

const DashboardElement = ({ title, slug }: DashboardElementProps) => {
	const { isSidebarOpen, activeDashboardElement, setActiveDashboardElement } =
		useDashboard();


	const DashboardViewElement = DashboardViewList[slug];

	const handleDashboardElementClose = () => {
		setActiveDashboardElement(null);
	}

	return (
		<section
			className={`${styles.dashboard_element_wrapper} ${isSidebarOpen ? styles.sidebar_open : ""
				} ${activeDashboardElement === slug ? styles.active : ""}`}>
			<header className={styles.header}>
				<h2>{title}</h2>
				<Button
					icon={CloseIcon}
					iconType='only-icon'
					style='secondary'
					size="small"
					onClick={handleDashboardElementClose}
				/>
			</header>

			{DashboardViewElement && <DashboardViewElement />}
		</section>
	);
};

export default DashboardElement;
