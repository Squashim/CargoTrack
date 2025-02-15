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
};

export type SidebarTagProps = {
	type: string;
};

// Context
export interface IDashboardContext {
	isSidebarOpen: boolean;
	activeDashboardElement: string | null;
	setIsSidebarOpen: (isOpen: boolean) => void;
	setActiveDashboardElement: (slug: string | null) => void;
}

export interface Props {
	children: React.ReactNode;
}
