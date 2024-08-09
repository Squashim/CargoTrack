import { Link } from "react-router-dom";
import logo from "../../assets/logo_light.webp";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import arrow_right from "../../assets/icons/arrow-right.svg";
import hamburger from "../../assets/icons/hamburger.svg";

import { useNavigate } from "react-router-dom";

const navLinks = [
	{
		title: "jak grać",
		to: "#how",
	},
	{
		title: "tabela wyników",
		to: "#scoreboard",
	},
	{
		title: "faq",
		to: "#faq",
	},
];

const NavBar = () => {
	const navigate = useNavigate();

	return (
		<nav className={styles.nav_container}>
			<Link to='/'>
				<img src={logo} alt='Cargo Track Logo' />
			</Link>

			<div className={styles.nav_menu}>
				<div>
					{navLinks.map((link) => {
						return (
							<Link key={link.title} to={link.to}>
								{link.title}
							</Link>
						);
					})}
				</div>
				<div>
					<Button
						style='secondary'
						text='logowanie'
						onClick={() => navigate("/logowanie")}
					/>
					<Button
						style='primary'
						icon={arrow_right}
						iconType={"icon-right"}
						text='dołącz za darmo'
						onClick={() => navigate("/rejestracja")}
					/>
				</div>
				<div>
					<Button style='secondary' iconType='only-icon' icon={hamburger} />
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
