import Map from "../../components/map/Map/Map";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import DashboardElement from "../../components/dashboard/DashboardElement";
import DashboardProvider from "../../context/DashboardContext";
import { SidebarData } from "../../components/ui/Sidebar/SidebarData";
import React from "react";
import { MapProvider } from "../../components/map/MapContext";

const Dashboard = () => {
	return (
		<MapProvider>
			<DashboardProvider>
				<Sidebar />

				{SidebarData.map((item) => (
					<React.Fragment key={item.target || item.name}>
						{item.dropdownItems?.map((dropdownItem) => (
							<DashboardElement
								key={dropdownItem.target}
								title={dropdownItem.name}
								slug={dropdownItem.target}
							/>
						))}
						{!item.dropdownItems && item.target && (
							<DashboardElement title={item.name} slug={item.target} />
						)}
					</React.Fragment>
				))}

				<Map />
			</DashboardProvider>
		</MapProvider>

	);
};

export default Dashboard;
