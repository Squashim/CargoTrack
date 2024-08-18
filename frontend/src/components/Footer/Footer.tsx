import styles from "./Footer.module.scss";

import github_icon from "../../assets/icons/github.svg";
import mail_icon from "../../assets/icons/mail.svg";

const Footer = () => {
	return (
		<footer id='contact'>
			<div className={styles.content}>
				<h2>Kontakt</h2>
				<div className={styles.element}>
					<h4>Adres kontaktowy</h4>
					<div className={styles.link}>
						<img src={mail_icon} alt='mail icon' />
						<a href='mailto:#'>pomoc@cargotrack.com</a>
					</div>
				</div>
				<div className={styles.element}>
					<h4>Pozostałe projekty</h4>

					<div className={styles.link}>
						<img src={github_icon} alt='github icon' />
						<a href='#' target='_blank'>
							github.com/MateuszBrankiewicz
						</a>
					</div>
					<div className={styles.link}>
						<img src={github_icon} alt='github icon' />
						<a href='#' target='_blank'>
							github.com/Squashim
						</a>
					</div>
				</div>
			</div>
			<div className={styles.copyright}>
				<p>Copyright © 2024 Zaprojektowane przez Squashim</p>
			</div>
		</footer>
	);
};

export default Footer;
