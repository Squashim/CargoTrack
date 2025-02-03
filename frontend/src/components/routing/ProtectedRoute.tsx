import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = () => {
	const { authenticated, isLoading } = useAuth();

	if (isLoading) {
		return <div>Trwa pobieranie danych!</div>;
	}

	// panel
	if (!authenticated) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
