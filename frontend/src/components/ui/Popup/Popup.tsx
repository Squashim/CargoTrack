import { useEffect } from "react";
import styles from "./Popup.module.scss";

const POPUP_SHOW_DURATION = 1500;

type PopupProps = {
	message: string;
	redirect?: string;
};

const Popup = ({ message, redirect }: PopupProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			if (redirect) {
				window.location.href = redirect;
			} else {
				window.location.reload();
			}
		}, POPUP_SHOW_DURATION);

		return () => clearTimeout(timer);
	});

	return (
		<div className={styles.popup_overlay}>
			<div className={styles.popup}>
				<h3>{message}</h3>
			</div>
		</div>
	);
};

export default Popup;
