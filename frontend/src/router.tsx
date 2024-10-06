import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RegisterPage from "./pages/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/Login";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AuthProvider>
				<App />
			</AuthProvider>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/rejestracja",
		element: (
			<AuthProvider>
				<RegisterPage />
			</AuthProvider>
		),
	},
	{
		path: "/logowanie",
		element: (
			<AuthProvider>
				<LoginPage />
			</AuthProvider>
		),
	},
	{
		path: "/panel",
		element: (
			<AuthProvider>
				<ProtectedRoute>
					<Dashboard />
				</ProtectedRoute>
			</AuthProvider>
		),
	},
]);
