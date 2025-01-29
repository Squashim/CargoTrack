import AuthProvider from "./context/AuthContext";
import Routes from "./Routes";
import "./styles/globals.scss";

function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}

export default App;
