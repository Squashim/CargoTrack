import styles from "./Sidebar.module.scss";
import Button from "../Button/Button";
import ChevronLeft from "../../../assets/icons/chevron_left.svg";
import ChevronRight from "../../../assets/icons/chevron_right.svg";
import { useState } from "react";
import { SidebarData } from "./SidebarData";
import Logo from "../Logo/Logo";
import SidebarWrapper from "./SidebarWrapper";
import SidebarItem, { SidebarAccount } from "./SidebarItem";
import { useDashboard } from "../../../hooks/useDashboard";
import { motion } from "framer-motion";

const Sidebar = () => {
	const { isSidebarOpen, setIsSidebarOpen } = useDashboard();
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
	const [prevActiveDropdown, setPrevActiveDropdown] = useState<number | null>(
		null
	);

	const handleSidebarToggle = () => {
		if (isSidebarOpen) {
			setPrevActiveDropdown(activeDropdown);
			setActiveDropdown(null);
		} else {
			setActiveDropdown(prevActiveDropdown);
		}

		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<motion.aside
			className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}>
			<header className={styles.header}>
				{isSidebarOpen && <Logo />}
				<Button
					iconType='only-icon'
					icon={isSidebarOpen ? ChevronLeft : ChevronRight}
					style='secondary'
					size='small'
					onClick={handleSidebarToggle}
				/>
			</header>

			<SidebarWrapper>
				{SidebarData.map((item, index) => (
					<SidebarItem
						key={index}
						item={item}
						index={index}
						activeDropdown={activeDropdown}
						setActiveDropdown={setActiveDropdown}
					/>
				))}
				<SidebarAccount />
			</SidebarWrapper>
		</motion.aside>
	);
};

export default Sidebar;
