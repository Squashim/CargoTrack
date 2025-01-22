/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from "axios";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

interface AuthContextType {
	authState: boolean | null;
	loading: boolean;
	setAuthState: React.Dispatch<React.SetStateAction<boolean | null>>;
	logout: () => void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authState, setAuthState] = useState<boolean | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const api = axios.create({
		baseURL: "http://localhost:8080",
		withCredentials: true,
	});

	useEffect(() => {
		const verifyUser = async () => {
			setLoading(true);
			try {
				const response = await api.post("/auth/verify");
				if (response.data === "Token is valid") {
					setAuthState(true);
				} else {
					setAuthState(false);
				}
			} catch (error) {
				setAuthState(false);
				console.log("Użytkownik nie został uwierzytelniony");
			} finally {
				setLoading(false);
			}
		};

		verifyUser();
	}, [authState]);

	useLayoutEffect(() => {
		const authInterceptor = api.interceptors.request.use(
			(config) => {
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.request.eject(authInterceptor);
		};
	}, []);

	useLayoutEffect(() => {
		const refreshInterceptor = api.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;
				const axiosErr = error as AxiosError;
				setLoading(true);

				if (axiosErr.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;

					try {
						await api.post("/auth/refresh");
						setAuthState(true);
						return api(originalRequest);
					} catch (refreshError) {
						setAuthState(false);
						console.log("Błąd w pobieraniu tokenu odświeżania");
					} finally {
						setLoading(false);
					}
				}

				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.response.eject(refreshInterceptor);
		};
	}, []);

	const logout = async () => {
		try {
			await api.post("/auth/logout");
			setAuthState(false);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<AuthContext.Provider value={{ authState, loading, setAuthState, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
