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

	return (
		<nav className={styles.nav_container}>
			<Link to='/#main' className={styles.logo}>
				<img src={logo} alt='Cargo Track Logo' />
			</Link>

			<h1>{authState ? "Zalogowano" : "Niezalogowano"}</h1>

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
						text='Logowanie'
						onClick={() => navigate("/logowanie")}
					/>
					<Button
						size='small'
						style='primary'
						icon={arrow_right}
						iconType={"icon-right"}
						text='Dołącz za darmo'
						onClick={() => navigate("/rejestracja")}
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
