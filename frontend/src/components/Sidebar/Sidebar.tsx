import { useNavigate } from "react-router";
import styles from "./Sidebar.module.scss";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const handleNavigate = (path: string) => () => {
		navigate(path);
	};

	return (
		<div className={styles.sidebar}>
			<button onClick={handleNavigate("/")}>Strona glowna</button>
			<button onClick={logout}>Wyloguj się</button>
		</div>
	);
};

export default Sidebar;
