export type SidebarDataProps = {
	name: string;
	icon: string;
	dropdownItems?: DropdownDataProps[];
	target?: string;
	tag?: string;
};

export type DropdownDataProps = {
	name: string;
	target: string;
	tag?: string;
};

export type SidebarWrapperProps = {
	children: React.ReactNode;
};

export type SidebarItemProps = {
	item: SidebarDataProps;
	index: number;
	activeDropdown: number | null;
	setActiveDropdown: (index: number | null) => void;
	userDetails: UserDetails | null;
};

export type SidebarTagProps = {
	type: string;
	userDetails: UserDetails | null;
};

export type SidebarAccountProps = {
	userDetails: UserDetails | null;
};

export type UserDetails = {
	accountBalance: number;
	companyName: string;
	email: string;
	numberOfBuildings: number;
	numberOfDeliveriesInProgress: number;
	numberOfDrivers: number;
	numberOfEndedDeliveries: number;
	numberOfVehicles: number;
};

export interface IDashboardContext {
	isSidebarOpen: boolean;
	activeDashboardElement: string | null;
	setIsSidebarOpen: (isOpen: boolean) => void;
	setActiveDashboardElement: (slug: string | null) => void;
}

export interface Props {
	children: React.ReactNode;
}
