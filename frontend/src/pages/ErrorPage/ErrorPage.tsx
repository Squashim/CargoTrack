const ErrorPage = () => {
	return (
		<div id='error-page'>
			<h1>Ojej!</h1>
			<h2>Błąd 404</h2>
			<button onClick={() => window.location.replace("/")}>
				Wróć do strony głównej
			</button>
		</div>
	);
};

export default ErrorPage;
