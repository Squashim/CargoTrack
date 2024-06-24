import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import "./Navbar.css";
import { Menu01Icon } from "hugeicons-react";
import { Cancel01Icon } from "hugeicons-react";

const NavBar = () => {
	// mobile navigation
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeLink, setActiveLink] = useState("");

	// change nav style when scrolling
	const [scrollNav, setScrollNav] = useState(false);

	const changeNavStyle = () => {
		if (window.scrollY >= 120) {
			setScrollNav(true);
		} else {
			setScrollNav(false);
		}
	};

	// handle showing active section in navbar
	const handleScroll = () => {
		const sections = document.querySelectorAll("section");
		let currentSection = "";
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			if (window.scrollY >= sectionTop - 50) {
				currentSection = section?.getAttribute("id") || "";
			}
		});

		setActiveLink(currentSection);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("scroll", changeNavStyle);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("scroll", changeNavStyle);
		};
	});

	// close mobile menu
	const closeMenu = () => {
		setTimeout(() => {
			setMenuOpen(false);
		}, 500);
	};

	return (
		<nav id='navbar-container' className={scrollNav ? "scroll" : ""}>
			<div className='logo-container'>
				<a href='#main' onClick={closeMenu}>
					<img src={logo} alt='Cargo Track logo' />
				</a>
			</div>

			<div className='icon-container' onClick={() => setMenuOpen(!menuOpen)}>
				{menuOpen && <Cancel01Icon size={32} />}
				{!menuOpen && <Menu01Icon size={32} />}
			</div>

			<div className={`links-container ${menuOpen ? "open" : ""}`}>
				<ul className='homepage-links'>
					<li>
						<a
							className={activeLink === "how-it-works" ? "active" : ""}
							href='#how-it-works'
							onClick={closeMenu}>
							jak to działa?
						</a>
					</li>
					<li>
						<a
							className={activeLink === "for-company" ? "active" : ""}
							href='#for-company'
							onClick={closeMenu}>
							dla firm
						</a>
					</li>
					<li>
						<a
							className={activeLink === "about" ? "active" : ""}
							onClick={closeMenu}
							href='#about'>
							o nas
						</a>
					</li>
				</ul>
				<ul className='otherpage-links'>
					<li>
						<NavLink to='/signup'>załóż konto</NavLink>
					</li>
					<li>
						<NavLink to='/signin'>zaloguj się</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
