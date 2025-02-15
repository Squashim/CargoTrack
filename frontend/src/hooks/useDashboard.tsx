import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export const useDashboard = () => {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error("useAuth must be used within an DashboardProvider");
	}
	return context;
};
