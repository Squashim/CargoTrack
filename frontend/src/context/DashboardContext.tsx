import { createContext, useState } from "react";
import { IDashboardContext, Props } from "../types/sidebar";

const initialState: IDashboardContext = {
	isSidebarOpen: true,
	activeDashboardElement: null,
	setIsSidebarOpen: () => { },
	setActiveDashboardElement: () => { },
};

export const DashboardContext = createContext<IDashboardContext>(initialState);

const DashboardProvider = ({ children }: Props) => {
	const [activeDashboardElement, setActiveDashboardElement] = useState<
		string | null
	>(initialState.activeDashboardElement);

	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
		initialState.isSidebarOpen
	);

	return (
		<DashboardContext.Provider
			value={{
				activeDashboardElement,
				setActiveDashboardElement,
				isSidebarOpen,
				setIsSidebarOpen
			}}>
			{children}
		</DashboardContext.Provider>
	);
};

export default DashboardProvider;
