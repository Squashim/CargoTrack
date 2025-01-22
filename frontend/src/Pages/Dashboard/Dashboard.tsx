import Map from "../../components/Map/Map";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
	return (
		<div style={{ display: "flex", minHeight: "100vh" }}>
			<Sidebar />
			<Map />
		</div>
	);
};

export default Dashboard;
