import { AuthProvider } from "./components/AuthContext/AuthContext";
import ScrollToAnchor from "./components/ScrollToAnchor";

import HomePage from "./pages/HomePage/HomePage";
import "./styles/globals.scss";

function App() {
	return (
		<AuthProvider>
			<ScrollToAnchor />
			<HomePage />
		</AuthProvider>
	);
}

export default App;
