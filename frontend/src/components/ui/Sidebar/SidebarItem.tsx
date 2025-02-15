import styles from "./Sidebar.module.scss";
import ChevronUp from "../../../assets/icons/chevron_up.svg";
import ChevronDown from "../../../assets/icons/chevron_down.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDashboard } from "../../../hooks/useDashboard";
import { SidebarItemProps, SidebarTagProps } from "../../../types/sidebar";
import AccountIcon from "../../../assets/icons/account_circle.svg";
import LogoutIcon from "../../../assets/icons/logout.svg";
import Button from "../Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import Tooltip from "../Tooltip/Tooltip";

const SidebarItem = ({
	item,
	index,
	activeDropdown,
	setActiveDropdown
}: SidebarItemProps) => {
	const {
		isSidebarOpen,
		setIsSidebarOpen,
		activeDashboardElement,
		setActiveDashboardElement
	} = useDashboard();
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	const isActive = activeDropdown === index;

	// Handling click events
	const handleItemClick = () => {
		// Close dropdown if it's already open
		setActiveDropdown(isActive ? null : index);

		// Handle active dashboard element
		if (item.target && activeDashboardElement !== item.target) {
			setActiveDashboardElement(item.target);
		} else if (item.target && activeDashboardElement === item.target) {
			setActiveDashboardElement(null);
		}

		// Open sidebar if it's closed
		if (!isSidebarOpen) {
			setIsSidebarOpen(true);
		}

		setShowTooltip(false);
	};

	const handleDropdownItemClick = (target: string) => {
		if (activeDashboardElement !== target) {
			setActiveDashboardElement(target);
		} else if (activeDashboardElement === target) {
			setActiveDashboardElement(null);
		}
	};

	// Accesibility features
	const firstDropdownItemRef = useRef<HTMLLIElement | null>(null);
	const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleItemClick();
		}
	};
	const handleDropdownKeyDown = (
		e: React.KeyboardEvent<HTMLUListElement | HTMLLIElement>,
		target: string = ""
	) => {
		if (e.key === "Escape") {
			setActiveDropdown(null);
		} else if (e.key === "Enter" || (e.key === " " && target)) {
			e.preventDefault();
			handleDropdownItemClick(target);
		}
	};
	useEffect(() => {
		if (isActive && firstDropdownItemRef.current) {
			firstDropdownItemRef.current.focus();
		}
	}, [isActive]);

	return (
		<li
			className={`${styles.sidebar_item} ${
				item.dropdownItems?.some(
					(dropdownItem) => dropdownItem.target === activeDashboardElement
				)
					? styles.active_item
					: ""
			}`}
			onMouseEnter={() => !isSidebarOpen && setShowTooltip(true)}
			onMouseLeave={() => !isSidebarOpen && setShowTooltip(false)}>
			{!isSidebarOpen && showTooltip && <Tooltip text={item.name} />}
			<button
				className={`${styles.sidebar_button} ${
					!item.target && !item.dropdownItems && styles.not_clickable
				} ${
					item.target && activeDashboardElement === item.target && styles.active
				}`}
				onClick={handleItemClick}
				onKeyDown={handleKeyDown}
				aria-expanded={isActive}
				tabIndex={item.target || item.dropdownItems ? 0 : -1}
				aria-controls={`dropdown-${index}`}>
				<img
					src={item.icon}
					alt={`Ikona ${item.name}`}
					aria-hidden='true'
					className={styles.icon}
				/>
				<span>{item.name}</span>
				{item.dropdownItems && (
					<img
						src={isActive ? ChevronUp : ChevronDown}
						alt='Ikona nawigacji rozsuwanej'
						aria-hidden='true'
						className={styles.more_icon}
					/>
				)}
			</button>

			{/* Optional tag */}
			{item.tag && <SidebarTag type={item.tag} />}

			{/* Optional dropdown menu */}
			<AnimatePresence>
				{isActive && item.dropdownItems && (
					<motion.ul
						id={`dropdown-${index}`}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className={styles.dropdown}
						role='menu'
						tabIndex={-1}
						aria-label='Podmenu'
						onKeyDown={(e) => handleDropdownKeyDown(e)}>
						{item.dropdownItems.map((dropdownItem, idx) => (
							<li
								key={idx}
								className={`${styles.dropdown_item} ${
									dropdownItem.target === activeDashboardElement &&
									styles.active
								}`}
								onClick={() => handleDropdownItemClick(dropdownItem.target)}
								onKeyDown={(e) => handleDropdownKeyDown(e, dropdownItem.target)}
								role='menuitem'
								tabIndex={0}
								ref={idx === 0 ? firstDropdownItemRef : null}>
								{dropdownItem.name}

								{/* Optional tag */}
								{dropdownItem.tag && <SidebarTag type={dropdownItem.tag} />}
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</li>
	);
};

export default SidebarItem;

export const SidebarAccount = () => {
	const { logout } = useAuth();

	return (
		<div className={styles.sidebar_account}>
			<img
				src={AccountIcon}
				alt='Ikona użytkownika'
				className={styles.user_icon}
			/>
			<div className={styles.account_info}>
				<p>Adminowa firma opór</p>
				<span>admin@admin.com</span>
			</div>
			<Button
				iconType='only-icon'
				size='small'
				icon={LogoutIcon}
				style='secondary'
				onClick={logout}
			/>
		</div>
	);
};

const SidebarTag = ({ type }: SidebarTagProps) => {
	let data = "";

	// TODO fetch data from API

	switch (type) {
		case "balance":
			data = "4 450 000";
			break;
		case "bought-properties":
			data = "1";
			break;
		case "workers":
			data = "2";
			break;
		case "fleet":
			// data = "4";
			break;
		case "ongoing-orders":
			data = "1";
			break;
		default:
			break;
	}

	return data !== "" && <span className={styles.tag}>{data}</span>;
};
