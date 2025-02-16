import styles from "./Sidebar.module.scss";
import Button from "../Button/Button";
import ChevronLeft from "../../../assets/icons/chevron_left.svg";
import ChevronRight from "../../../assets/icons/chevron_right.svg";
import { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import Logo from "../Logo/Logo";
import SidebarWrapper from "./SidebarWrapper";
import SidebarItem, { SidebarAccount } from "./SidebarItem";
import { useDashboard } from "../../../hooks/useDashboard";
import { motion } from "framer-motion";
import axios from "axios";
import { type UserDetails } from "../../../types/sidebar";

const Sidebar = () => {
	const { isSidebarOpen, setIsSidebarOpen } = useDashboard();
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
	const [prevActiveDropdown, setPrevActiveDropdown] = useState<number | null>(
		null
	);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

	const handleSidebarToggle = () => {
		if (isSidebarOpen) {
			setPrevActiveDropdown(activeDropdown);
			setActiveDropdown(null);
		} else {
			setActiveDropdown(prevActiveDropdown);
		}

		setIsSidebarOpen(!isSidebarOpen);
	};

	// Fetch user details from the API
	useEffect(() => {
		const API_BASE_URL = import.meta.env.VITE_BASE_URL;
		const detailsPath = API_BASE_URL + "/user/details";

		const fetchUserDetails = async () => {
			try {
				const response = await axios.get(detailsPath, {
					withCredentials: true
				});
				setUserDetails(response.data);
			} catch (error) {
				setUserDetails(null);
			}
		};

		fetchUserDetails();
	}, []);

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
				{userDetails &&
					SidebarData.map((item, index) => (
						<SidebarItem
							key={index}
							item={item}
							index={index}
							activeDropdown={activeDropdown}
							setActiveDropdown={setActiveDropdown}
							userDetails={userDetails}
						/>
					))}
				<SidebarAccount userDetails={userDetails} />
			</SidebarWrapper>
		</motion.aside>
	);
};

export default Sidebar;
