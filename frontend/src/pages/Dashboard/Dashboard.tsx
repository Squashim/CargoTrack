import Map from "../../components/map/Map/Map";
import Sidebar from "../../components/ui/Sidebar/Sidebar";

const Dashboard = () => {
	return (
		<div style={{ display: "flex", minHeight: "100vh" }}>
			<Sidebar />
			<Map />
		</div>
	);
};

export default Dashboard;
