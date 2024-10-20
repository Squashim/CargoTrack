import { AuthProvider } from "./components/AuthContext/AuthContext";
import ScrollToAnchor from "./components/ScrollToAnchor";
import Dashboard from "./pages/Dashboard/Dashboard";

import HomePage from "./pages/HomePage/HomePage";
import "./styles/globals.scss";

function App() {
	return (
		// <Dashboard />
		<AuthProvider>
			<ScrollToAnchor />
			<HomePage />
		</AuthProvider>
	);
}

export default App;
