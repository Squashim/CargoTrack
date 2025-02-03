import AuthProvider from "./context/AuthContext";
import Routes from "./components/routing/Routes";
import "./styles/globals.scss";

function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}

export default App;
