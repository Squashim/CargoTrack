import styles from "./Sidebar.module.scss";
import { SidebarWrapperProps } from "../../../types/sidebar";

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
	return (
		<nav
			className={styles.sidebar_wrapper}
			aria-label='Boczna nawigacja panelu użytkownika'>
			<ul>{children}</ul>
		</nav>
	);
};

export default SidebarWrapper;
