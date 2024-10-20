import { useLayoutEffect } from "react";
import Map from "../../components/Map/Map";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Dashboard = () => {
	const { authState } = useAuth();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (!authState) {
			navigate("/");
		}
	});

	return (
		<div style={{ display: "flex", minHeight: "100vh" }}>
			<Sidebar />
			<Map />
		</div>
	);
};

export default Dashboard;
