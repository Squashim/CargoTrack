import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { authState } = useAuth();

	if (!authState.accessToken) {
		return <Navigate to='/logowanie' replace />;
	}

	return children;
};

export default ProtectedRoute;
