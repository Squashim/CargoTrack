import NavBar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.scss";

const HomePage = () => {
	return (
		<>
			<NavBar />
			<main className={styles.main}>
				<h1>Spróbuj swoich sił w zarządzaniu firmą transportową.</h1>
				<h2>
					Nasza strona oferuje symulację działalności przedsiębiorstwa, w którym
					to użytkownik wciela się w rolę kierownika.
				</h2>
				<h3>
					Kupuj, sprzedawaj, transportuj, zatrudniaj i konkuruj z innymi firmami
					na rynku.
				</h3>
				<button>Rozpocznij zabawę</button>
				<p>lub</p>
				<button>Sprawdź jak to działa</button>
			</main>
			<section id='how'>
				<h2>Jak to działa?</h2>
			</section>

			<section id='scoreboard'>
				<h2>Tablica wyników</h2>
			</section>

			<section id='faq'>
				<h2>FAQ</h2>
			</section>
		</>
	);
};

export default HomePage;
