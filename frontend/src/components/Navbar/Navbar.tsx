import { Link } from "react-router-dom";
import logo from "../../assets/logo_light.webp";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import arrow_right from "../../assets/icons/arrow-right.svg";
import hamburger from "../../assets/icons/hamburger.svg";
import close from "../../assets/icons/close.svg";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const NavBar = () => {
	const navigate = useNavigate();
	const { authState } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};
	const closeMenuOnMobile = () => {
		if (window.innerWidth <= 1150) {
			setShowMenu(false);
		}
	};

	const logout = async () => {
		try {
			axios.defaults.withCredentials = true;

			await axios.post("http://localhost:8080/auth/logout");

			alert("Wylogowano pomyślnie!");
			window.location.reload();
		} catch (error) {
			console.error("Error with logout!");
		}
	};

	return (
		<nav className={styles.nav_container}>
			<Link to='/#main' className={styles.logo}>
				<img src={logo} alt='Cargo Track Logo' />
			</Link>

			<div className={`${styles.nav_menu} ${showMenu ? styles.showMenu : ""}`}>
				<div className={styles.nav_links}>
					<Link onClick={closeMenuOnMobile} to='#how'>
						jak grać
					</Link>
					<Link onClick={closeMenuOnMobile} to='#scoreboard'>
						tabela wyników
					</Link>
					<Link onClick={closeMenuOnMobile} to='#faq'>
						FAQ
					</Link>
					<Link onClick={closeMenuOnMobile} to='#contact'>
						kontakt
					</Link>
				</div>

				<div
					className={`${styles.nav_buttons} ${
						showMenu ? styles.showMenu : ""
					}`}>
					<Button
						size='small'
						style='secondary'
						text={authState ? "Wyloguj się" : "Logowanie"}
						onClick={authState ? () => logout() : () => navigate("/logowanie")}
					/>
					<Button
						size='small'
						style='primary'
						icon={arrow_right}
						iconType={"icon-right"}
						text={authState ? "Przejdź do panelu" : "Dołącz za darmo"}
						onClick={
							authState
								? () => navigate("/panel")
								: () => navigate("/rejestracja")
						}
					/>
				</div>
			</div>

			<div className={styles.toggleBtn}>
				<Button
					style='secondary'
					iconType='only-icon'
					icon={showMenu ? close : hamburger}
					onClick={toggleMenu}
				/>
			</div>
		</nav>
	);
};

export default NavBar;
