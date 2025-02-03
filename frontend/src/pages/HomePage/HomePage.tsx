import Button from "../../components/ui/Button/Button";
import Navbar from "../../components/ui/Navbar/Navbar";
import styles from "./HomePage.module.scss";

import person from "../../assets/icons/person.svg";
import trending_up from "../../assets/icons/trending_up.svg";
import trophy from "../../assets/icons/trophy.svg";
import info from "../../assets/icons/info.svg";
import Step from "../../components/ui/Step/Step";
import chevron_down from "../../assets/icons/chevron_down.svg";
import container from "../../assets/icons/container.svg";

import Scoreboard from "../../components/ui/Scoreboard/Scoreboard";
import Accordion from "../../components/ui/Accordion/Accordion";
import Footer from "../../components/ui/Footer/Footer";
import { useNavigate } from "react-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import ScrollToAnchor from "../../components/utils/ScrollToAnchor";

const HomePage = () => {
	return (
		<>
			<SVGScrollPath />
			<Navbar />
			<Main />
			<Section id='how'>
				<h2>Jak to działa?</h2>
				<Step
					caption='krok 1'
					icon={person}
					title='Załóż konto.'
					content='W  pełni darmowe doświadczenie, w którym ryzwalizujesz z innymi graczami, wystawiając na próbę swoje umiejętności.'
				/>
				<Step
					caption='krok 2'
					icon={trending_up}
					title='Zarabiaj i rozwijaj swoją firmę.'
					content='Zainwestuj w swoją działalność i wykonaj pierwsze zlecenie. Powiększaj swoją kadrę pracowniczą i flotę pojazdów.'
				/>
				<Step
					caption='krok 3'
					icon={trophy}
					title='Wygrywaj.'
					content='Firma z największą ilością zebranej gotówki na koniec miesiąca wygrywa i zostaje uwieczniona na podium.'
				/>
				<div className={styles.warning}>
					<img src={info} alt='info icon' />
					<p>Uwaga! Pieniądze w grze są fikcyjne!</p>
				</div>
			</Section>
			<Section id='scoreboard'>
				<Scoreboard />
			</Section>
			<Section id='faq'>
				<h2>FAQ</h2>
				<h3>Najczęściej zadawane pytania</h3>
				<Accordion />
			</Section>
			<Footer />
		</>
	);
};

export default HomePage;

type SectionProps = {
	children: ReactNode;
	id: string;
};

const Section = ({ children, id }: SectionProps) => {
	const ref = useRef(null);
	const inView = useInView(ref, { amount: 0.2, once: true });
	const controls = useAnimation();

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [inView, controls]);

	return (
		<motion.section
			id={id}
			className={styles.section}
			ref={ref}
			variants={{
				hidden: { opacity: 0, translateY: 90 },
				visible: { opacity: 1, translateY: 0 }
			}}
			transition={{
				type: "spring",
				duration: 0.8,
				damping: 8,
				delay: 0.2,
				stiffness: 100
			}}
			initial='hidden'
			animate={controls}>
			{children}
		</motion.section>
	);
};

const Main = () => {
	const navigate = useNavigate();
	const { authenticated } = useAuth();
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 80) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	return (
		<>
			<main className={styles.main} id='main'>
				<h1>Spróbuj swoich sił w zarządzaniu firmą transportową.</h1>
				<h2>
					Nasza strona oferuje symulację działalności przedsiębiorstwa, w którym
					to użytkownik wciela się w rolę kierownika.
				</h2>
				<h3>
					Kupuj, sprzedawaj, transportuj, zatrudniaj i konkuruj z innymi firmami
					na rynku.
				</h3>
				<div className={styles.btn_group}>
					<Button
						size='big'
						style='primary'
						text='Rozpocznij zabawę'
						onClick={
							authenticated
								? () => navigate("/user/dashboard")
								: () => navigate("/register")
						}
					/>
					<hr data-content='lub'></hr>
					<Button
						size='big'
						style='secondary'
						text='Sprawdź jak to działa'
						iconType='icon-right'
						icon={chevron_down}
						onClick={() => navigate("/#how")}
					/>
				</div>

				<motion.div
					className={styles.mouse_scroll}
					variants={{
						hidden: { opacity: 0, translateY: 90 },
						visible: { opacity: 1, translateY: 0 }
					}}
					transition={{
						type: "spring",
						duration: 0.8,
						damping: 8,
						delay: 0.2,
						stiffness: 100
					}}
					initial='hidden'
					animate={isVisible ? "visible" : "hidden"}>
					<img src={chevron_down} alt='chevron_down ikona' />
				</motion.div>
			</main>
			<ScrollToAnchor />
		</>
	);
};

const SVGScrollPath = () => {
	const pathRef = useRef<SVGPathElement>(null);
	const carRef = useRef<HTMLDivElement>(null);
	const [scrollPositon, setScrollPosition] = useState(0);

	const handleScroll = () => {
		setScrollPosition(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (pathRef.current && carRef.current) {
			const totalLength = pathRef.current.getTotalLength();
			const scrollRatio =
				scrollPositon /
					(document.documentElement.scrollHeight - window.innerHeight) +
				0.02;

			const carPosition = totalLength * scrollRatio;

			// Get the current point on the path
			const currentPoint = pathRef.current.getPointAtLength(carPosition);

			// Position and rotate the car with the correct offsets
			carRef.current.style.transform = `translate(${currentPoint.x - 50}px, ${
				currentPoint.y - 50
			}px)`;

			// For the path reveal effect
			pathRef.current.style.strokeDasharray = totalLength.toString();
			pathRef.current.style.strokeDashoffset = (
				totalLength - carPosition
			).toString();
		}
	});

	return (
		<div className={styles.svg_container}>
			<svg
				viewBox='0 0 1358 2964'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					ref={pathRef}
					d='M1320.03 10C1320.03 10 1045.78 22.2418 1004.53 192.5C957.531 386.5 1135.35 481.969 1060.53 552.5C942.517 663.743 170.09 398.5 23.5306 620C-150.931 883.669 1424.18 861.719 1159.03 1162C1035.56 1301.84 357.531 1209.07 357.531 1344.5C357.531 1474.92 987.417 1237.39 1280.53 1615.5C1573.64 1993.61 813.031 2022 726.531 2185.5C640.031 2349 1204.41 2183.58 1230.42 2337.5C1256.42 2491.42 854.031 2783.5 743.031 2662C664.738 2576.3 734.697 2393.08 869.031 2409.5C1098.03 2437.5 1169.02 2684.31 1152.41 2819.5C1128.99 3010.15 683.031 2866.5 563.031 2954'
				/>
			</svg>

			<div className={styles.truck} ref={carRef}>
				<img src={container} alt='truck icon' />
			</div>
		</div>
	);
};
