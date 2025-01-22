import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type ProtectedRouteProps = {
	needAuth?: boolean;
	redirectPath?: string;
	children: React.ReactNode;
};

const ProtectedRoute = ({
	needAuth = true,
	redirectPath = "/logowanie",
	children,
}: ProtectedRouteProps) => {
	const { authState, loading } = useAuth();

	if (loading) {
		return <div>Trwa pobieranie danych!</div>;
	}

	// panel
	if (!authState && needAuth) {
		return <Navigate to={redirectPath} replace />;
	}

	// logowanie/ rejestracja
	if (authState && !needAuth) {
		return <Navigate to={redirectPath} replace />;
	}

	return children;
};

export default ProtectedRoute;
