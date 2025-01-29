import axios, { AxiosError } from "axios";
import {
	createContext,
	ReactNode,
	useEffect,
	useLayoutEffect,
	useState
} from "react";

interface IAuthContext {
	authenticated: boolean | null;
	isLoading: boolean;
	setAuthenticated: (newState: boolean | null) => void;
	logout: () => void;
}

interface Props {
	children: ReactNode;
}

const initialValue = {
	authenticated: false,
	isLoading: true,
	setAuthenticated: () => {},
	logout: () => {}
};

export const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const API_BASE_URL = import.meta.env.VITE_BASE_URL;
	const verifyPath = API_BASE_URL + "/auth/verify";
	const refreshPath = API_BASE_URL + "/auth/refresh";
	const logoutPath = API_BASE_URL + "/auth/logout";

	axios.defaults.withCredentials = true;

	useEffect(() => {
		const verifyUser = async () => {
			setIsLoading(true);
			try {
				const response = await axios.post(verifyPath);
				if (response.data === "Token is valid") {
					setAuthenticated(true);
				} else {
					setAuthenticated(false);
				}
			} catch (error) {
				setAuthenticated(false);
				console.log("Użytkownik nie został uwierzytelniony");
			} finally {
				setIsLoading(false);
				// Clear console to avoid showing multiple errors
				console.clear();
			}
		};
		verifyUser();
	}, [verifyPath]);

	useLayoutEffect(() => {
		const authInterceptor = axios.interceptors.request.use(
			(config) => {
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.request.eject(authInterceptor);
		};
	}, []);

	useLayoutEffect(() => {
		const refreshInterceptor = axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;
				const axiosErr = error as AxiosError;
				setIsLoading(true);

				if (axiosErr.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;

					try {
						await axios.post(refreshPath);
						setAuthenticated(true);
						return axios(originalRequest);
					} catch (refreshError) {
						setAuthenticated(false);
						console.log("Błąd w pobieraniu tokenu odświeżania");
					} finally {
						setIsLoading(false);
						// Clear console to avoid showing multiple errors
						console.clear();
					}
				}

				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.response.eject(refreshInterceptor);
		};
	}, [refreshPath]);

	const logout = async () => {
		try {
			await axios.post(logoutPath);
			setAuthenticated(false);
			window.location.reload();
		} catch (error) {
			console.error("Wylogowywanie nieudane:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ authenticated, isLoading, setAuthenticated, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
