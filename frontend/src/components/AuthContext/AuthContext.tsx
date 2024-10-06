import axios from "axios";
import { createContext, useState, useEffect } from "react";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
}

interface AuthContextProps {
	authState: AuthState;
	setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authState, setAuthState] = useState<AuthState>({
		accessToken: null,
		refreshToken: null,
	});

	useEffect(() => {
		const api = axios.create({
			baseURL: "http://localhost:8080",
		});

		console.log(authState);

		api.interceptors.request.use(
			(config) => {
				if (authState.accessToken) {
					config.headers["Authorization"] = `Bearer ${authState.accessToken}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		api.interceptors.response.use(
			(response) => {
				return response;
			},
			async (error) => {
				const originalRequest = error.config;
				if (error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					const response = await axios.post(
						"https://localhost:8080/auth/refresh",
						{
							token: authState.refreshToken,
						}
					);
					setAuthState({
						...authState,
						accessToken: response.data.token,
					});
					originalRequest.headers[
						"Authorization"
					] = `Bearer ${response.data.token}`;
					return api(originalRequest);
				}
				return Promise.reject(error);
			}
		);

		setAuthState((prevState) => ({
			...prevState,
			api,
		}));
	}, [authState.accessToken, authState.refreshToken]);

	return (
		<AuthContext.Provider value={{ authState, setAuthState }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
