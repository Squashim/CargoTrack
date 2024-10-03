import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
	token: string | null;
	setToken: React.Dispatch<React.SetStateAction<string | null>>;
	loading: boolean;
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		setToken(storedToken);
		setLoading(false);
	}, []);

	return (
		<AuthContext.Provider value={{ token, setToken, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
