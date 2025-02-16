import MoneyIcon from "../../../assets/icons/money.svg";
import BuildingIcon from "../../../assets/icons/building.svg";
import WorkersIcon from "../../../assets/icons/groups.svg";
import TruckIcon from "../../../assets/icons/truck.svg";
import PackageIcon from "../../../assets/icons/container.svg";
import SettingsIcon from "../../../assets/icons/settings.svg";
import HelpIcon from "../../../assets/icons/help.svg";
import { type SidebarDataProps } from "../../../types/sidebar";

export const SidebarData: SidebarDataProps[] = [
	{
		name: "Stan konta",
		icon: MoneyIcon,
		tag: "balance"
	},
	{
		name: "Nieruchomości",
		icon: BuildingIcon,
		dropdownItems: [
			{
				name: "Moje nieruchomości",
				target: "my-properties",
				tag: "bought-properties"
			},
			{
				name: "Rynek nieruchomości",
				target: "real-estate-market"
			}
		]
	},
	{
		name: "Pracownicy",
		icon: WorkersIcon,
		dropdownItems: [
			{
				name: "Lista pracowników",
				target: "workers-list",
				tag: "workers"
			},
			{
				name: "Zatrudnij pracownika",
				target: "hire-worker"
			}
		]
	},
	{
		name: "Pojazdy",
		icon: TruckIcon,
		dropdownItems: [
			{
				name: "Moja flota",
				target: "my-fleet",
				tag: "fleet"
			},
			{
				name: "Zakup pojazdu",
				target: "buy-vehicle"
			}
		]
	},
	{
		name: "Zlecenia",
		icon: PackageIcon,
		dropdownItems: [
			{
				name: "Zlecenia w toku",
				target: "ongoing-orders",
				tag: "ongoing-orders"
			},
			{
				name: "Zlecenia zakończone",
				target: "completed-orders",
				tag: "ended-orders"
			},
			{
				name: "Wyszukaj zlecenie",
				target: "search-order"
			}
		]
	},
	{
		name: "Ustawienia",
		icon: SettingsIcon,
		target: "settings"
	},
	{
		name: "Pomoc",
		icon: HelpIcon,
		target: "help"
	}
];
