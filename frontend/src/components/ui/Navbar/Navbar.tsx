import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import arrow_right from "../../../assets/icons/arrow-right.svg";
import hamburger from "../../../assets/icons/hamburger.svg";
import close from "../../../assets/icons/close.svg";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "../Logo/Logo";

const NavBar = () => {
	const navigate = useNavigate();
	const { authenticated, logout } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [activeLink, setActiveLink] = useState<string>("");

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const closeMenuOnMobile = () => (isMobile ? setShowMenu(false) : null);

	// Check if user is on mobile device
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1150);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Close mobile menu when clicked outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element | null;
			if (
				target &&
				!target.closest(`.${styles.nav_container}`) &&
				!target.closest(`.${styles.nav_menu}`) &&
				!target.closest(`.${styles.toggleBtn}`)
			) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	// Focus first link in mobile menu, for accessibility
	useEffect(() => {
		if (showMenu) {
			const firstLink = document.querySelector(
				`#menu-item-1`
			) as HTMLAnchorElement;
			if (firstLink) {
				firstLink.focus();
			}
		}
	});

	// Observe scroll position and set active link
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveLink(`#${entry.target.id}`);
					}
				});
			},
			{
				threshold: 0.5
			}
		);

		const sections = document.querySelectorAll("section, footer, main");
		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, []);

	return (
		<nav className={styles.nav_container}>
			<Logo />

			<div
				className={`${styles.nav_menu} ${showMenu ? styles.showMenu : ""}`}
				role='navigation'
				aria-label='Menu główne'
				aria-expanded={showMenu}
				id='nav_menu'>
				<div className={styles.nav_links}>
					<Link
						onClick={closeMenuOnMobile}
						to='#how'
						tabIndex={!isMobile || showMenu ? 0 : -1}
						id='menu-item-1'
						aria-label='Jak zagrać'
						className={activeLink === "#how" ? styles.active : ""}>
						jak grać
					</Link>
					<Link
						onClick={closeMenuOnMobile}
						to='#scoreboard'
						tabIndex={!isMobile || showMenu ? 0 : -1}
						id='menu-item-2'
						aria-label='Tablica wyników'
						className={activeLink === "#scoreboard" ? styles.active : ""}>
						tabela wyników
					</Link>
					<Link
						onClick={closeMenuOnMobile}
						to='#faq'
						tabIndex={!isMobile || showMenu ? 0 : -1}
						id='menu-item-3'
						aria-label='Często zadawane pytania'
						className={activeLink === "#faq" ? styles.active : ""}>
						FAQ
					</Link>
					<Link
						onClick={closeMenuOnMobile}
						to='#contact'
						tabIndex={!isMobile || showMenu ? 0 : -1}
						id='menu-item-4'
						aria-label='Kontakt'
						className={activeLink === "#contact" ? styles.active : ""}>
						kontakt
					</Link>
				</div>

				<div
					className={`${styles.nav_buttons} ${
						showMenu ? styles.showMenu : ""
					}`}>
					<Button
						style='secondary'
						text={authenticated ? "Wyloguj się" : "Logowanie"}
						onClick={authenticated ? () => logout() : () => navigate("/login")}
						tabIndex={!isMobile || showMenu ? 0 : -1}
					/>
					<Button
						style='primary'
						icon={arrow_right}
						iconType={"icon-right"}
						tabIndex={!isMobile || showMenu ? 0 : -1}
						text={authenticated ? "Przejdź do panelu" : "Dołącz za darmo"}
						onClick={
							authenticated
								? () => navigate("/user/dashboard")
								: () => navigate("/register")
						}
					/>
				</div>
			</div>

			<div className={styles.toggleBtn}>
				<Button
					style='secondary'
					iconType='only-icon'
					icon={showMenu ? close : hamburger}
					aria-label={showMenu ? "Zamknij menu" : "Otwórz menu"}
					onClick={toggleMenu}
					aria-expanded={showMenu}
					aria-controls='nav_menu'
				/>
			</div>
		</nav>
	);
};

export default NavBar;
