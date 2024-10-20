import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const { authState } = useAuth();

	if (!authState) {
		return <Navigate to='/logowanie' replace />;
	}

	return children;
};

export default ProtectedRoute;
