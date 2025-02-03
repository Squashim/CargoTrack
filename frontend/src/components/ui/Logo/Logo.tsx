import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import logo from "../../../assets/logo_light.webp";

const Logo = () => {
	return (
		<Link to='/#main' className={styles.logo}>
			<img src={logo} alt='Cargo Track Logo' />
		</Link>
	);
};

export default Logo;
