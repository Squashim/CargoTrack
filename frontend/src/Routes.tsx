import {
	createBrowserRouter,
	Navigate,
	RouterProvider
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RegisterPage from "./pages/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import HomePage from "./pages/HomePage/HomePage";

const Routes = () => {
	const { authenticated } = useAuth();

	const nonAuthorizedRoutes = [
		{
			path: "/register",
			element: authenticated ? (
				<Navigate to='/user/dashboard' />
			) : (
				<RegisterPage />
			)
		},
		{
			path: "/login",
			element: authenticated ? <Navigate to='/user/dashboard' /> : <LoginPage />
		}
	];

	const publicRoutes = [
		{
			path: "/",
			element: <HomePage />
		}
	];

	const authorizedRoutes = [
		{
			path: "/user",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/user/dashboard",
					element: <Dashboard />
				}
			]
		}
	];

	const errorRoutes = [
		{
			path: "*",
			element: <ErrorPage />
		}
	];

	const routes = [
		...nonAuthorizedRoutes,
		...publicRoutes,
		...authorizedRoutes,
		...errorRoutes
	];

	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
};

export default Routes;
