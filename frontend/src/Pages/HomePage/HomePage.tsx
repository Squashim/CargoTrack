import "./HomePage.css";

const HomePage = () => {
	return (
		<>
			<main id='main-home'>
				<article>
					<h1>
						Zarządzaj transportami swojej firmy na bieżąco, z jednego miejsca.
					</h1>
					<h2>
						Pomagamy w tworzeniu i zarządzaniu firmami zajmującymi się
						transportami towarów.
					</h2>

					<div>
						<button>ZOBACZ OFERTĘ</button>
						<button>PRZETESTUJ</button>
					</div>
				</article>
			</main>
			<section id='how-it-works'>
				<h2>Jak to działa?</h2>
			</section>
			<section id='for-company'>
				<h2>Dla firm?</h2>
			</section>
			<section id='about'>
				<h2>O nas</h2>
			</section>
		</>
	);
};

export default HomePage;
