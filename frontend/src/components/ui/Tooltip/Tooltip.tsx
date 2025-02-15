import styles from "./Tooltip.module.scss";
import { motion } from "framer-motion";

const Tooltip = ({ text }: { text: string }) => {
	return (
		<motion.div
			className={styles.tooltip}
			initial={{ opacity: 0, scale: 0.9, x: "-25%", y: "-50%" }}
			animate={{ opacity: 1, scale: 1, x: "0%", y: "-50%" }}
			transition={{ duration: 0.2, ease: "easeOut" }}>
			{text}
		</motion.div>
	);
};

export default Tooltip;
