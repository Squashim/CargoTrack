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
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/rejestracja",

		element: (
			<AuthProvider>
				<ProtectedRoute needAuth={false} redirectPath='/panel'>
					<RegisterPage />
				</ProtectedRoute>
			</AuthProvider>
		),
	},
	{
		path: "/logowanie",
		element: (
			<AuthProvider>
				<ProtectedRoute needAuth={false} redirectPath='/panel'>
					<LoginPage />
				</ProtectedRoute>
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
