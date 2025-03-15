import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import provincesData from "../../../data/provinces"
import axios from "axios";
import { BuildingLocation } from "../../../types/building";
import styles from "./BuildingsMarket.module.scss"
import Button from "../../ui/Button/Button";
import { MarkerProps } from "react-leaflet";
import Select from "../../ui/Select/Select";
import { latLng } from "leaflet";
import { useMap } from "../../map/MapContext";
import { useDashboard } from "../../../hooks/useDashboard";
import CloseIcon from "../../../assets/icons/close.svg";
import { motion } from "framer-motion";

const BuildingMarket = () => {
	const [selectedProvince, setSelectedProvince] = useState<string>("");
	const [buildings, setBuildings] = useState<BuildingLocation[]>([]);
	const { setMarkers, zoomToMarker, setActiveMarker, clearMarkers, activeMarker, openMarkerPopup, clearMarkersPopups } = useMap();
	const { activeDashboardElement } = useDashboard();

	const [showBuildingConfiguration, setShowBuildingConfiguration] = useState<boolean>(false);
	const [activeBuilding, setActiveBuilding] = useState<BuildingLocation | null>(null);

	const buildingRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


	useEffect(() => {
		if (!selectedProvince) {
			clearMarkers();
			return;
		}

		const fetchProvinceBuildings = async () => {
			const API_BASE_URL = import.meta.env.VITE_BASE_URL;
			const url = `${API_BASE_URL}/buildings/locations/${selectedProvince}`;

			try {
				const response = await axios.get(url, {
					withCredentials: true
				});
				const sortedBuildings = response.data.sort((a: BuildingLocation, b: BuildingLocation) => a.city.localeCompare(b.city));
				setBuildings(sortedBuildings);

				const newMarkers: MarkerProps[] = response.data.map((building: BuildingLocation) => ({
					position: [building.latitude, building.longitude],
					title: building.city,
					alt: `street:${building.street},number:${building.number}`
				}))

				setMarkers(newMarkers);

			} catch (error) {
				console.error("Error fetching buildings:", error);
				setBuildings([]);
				setMarkers(null);
			}
		};

		clearMarkers();
		clearMarkersPopups();
		setShowBuildingConfiguration(false);
		setActiveBuilding(null);

		if (activeDashboardElement === "real-estate-market") {
			fetchProvinceBuildings();
		}

	}, [selectedProvince, activeDashboardElement]);

	const handleMarkerSelect = (lat: number, lng: number, title: string) => {
		setActiveMarker({ position: [lat, lng], title: title });
		openMarkerPopup(lat, lng);
		zoomToMarker(latLng(lat, lng));
	}

	useEffect(() => {
		if (activeMarker) {
			const activeKey = `${activeMarker.position.toString()}`;
			const ref = buildingRefs.current[activeKey];

			if (ref) {
				ref.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		} else {
			if (buildingRefs.current) {
				const keys = Object.keys(buildingRefs.current);
				const firstKey = keys[0];
				const ref = buildingRefs.current[firstKey];
				if (ref) {
					ref.scrollIntoView({ behavior: "smooth", block: "center" });
				}
			}
		}
	}, [activeMarker]);

	const handleBuildingConfiguration = (building: BuildingLocation) => {
		setActiveBuilding(building);
		setShowBuildingConfiguration(true);
		handleMarkerSelect(building.latitude, building.longitude, building.city);

	}

	return (
		<>
			<div>
				<p>Województwo:</p>
				<Select
					value={selectedProvince}
					onChange={setSelectedProvince}
					placeholder="Wybierz województwo"
					options={provincesData.map((item) => ({
						label: item,
						value: item
					}))} />
			</div>

			{buildings.length > 0 ? (
				<div className={styles.building_container}  >
					{buildings.map((building) => {
						const buildingKey = `${building.latitude.toString()},${building.longitude.toString()}`;
						return (
							<div className={`${styles.building_card} ${activeMarker?.position.toString() === `${building.latitude.toString()},${building.longitude.toString()}` ? styles.active : ""}`} key={building.id} ref={(el) => (buildingRefs.current[buildingKey] = el)}>
								<header>
									<h5>Miejscowość {building.city}</h5>
									<p>{building.street && "ul. " + building.street} {building.number}</p>

								</header>

								<div className={styles.actions}>
									<Button style="tertiary" text="Konfiguruj działkę" size="small" onClick={() => handleBuildingConfiguration(building)} />
									<Button style="tertiary" text="Zobacz na mapie" size="small" onClick={
										() => handleMarkerSelect(building.latitude, building.longitude, building.city)
									} />
								</div>
							</div>
						)


					})}
				</div>

			) : (
				<BuildingPlaceholders />
			)}

			{showBuildingConfiguration && activeBuilding && (
				<BuildingConfigurator building={activeBuilding} setShowBuildingConfiguration={setShowBuildingConfiguration} />
			)}
		</>
	);
};

export default BuildingMarket;

interface BuildingConfiguratorProps {
	building: BuildingLocation;
	setShowBuildingConfiguration: Dispatch<SetStateAction<boolean>>;
}

interface BuildingTypeProps {
	id: number;
	vehicleCapacity: number;
	trailerCapacity: number;
	driverCapacity: number;
	name: string;
	radius: number;
	// price: number; TODO
}

const BuildingConfigurator = ({ building, setShowBuildingConfiguration }: BuildingConfiguratorProps) => {
	const [buildingTypes, setBuildingTypes] = useState<BuildingTypeProps[]>([]);
	const [haveHeadquarter, setHaveHeadquarter] = useState<boolean>(false);
	const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingTypeProps | null>(null);
	const [userMoney, setUserMoney] = useState<number>(0);

	const handleBuildingTypeSelect = (type: BuildingTypeProps) => {
		setSelectedBuildingType(type);
	}

	const canBuyBuilding = () => {
		if (selectedBuildingType === null) {
			return false;
		}
		// TODO
		// else if (userMoney < selectedBuildingType.price || userMoney <= 0) {
		// 	return false;
		// }

		return true;
	}

	const handleBuyBuilding = () => {
		console.log("Kupiono budynek");
	}

	useEffect(() => {
		const API_BASE_URL = import.meta.env.VITE_BASE_URL;

		const fetchBuildingTypes = async () => {
			const url = `${API_BASE_URL}/buildings/allTypes`;

			try {
				const response = await axios.get(url, {
					withCredentials: true
				});

				setBuildingTypes(response.data);

			} catch (error) {
				console.error("Error fetching building types:", error);
				setBuildingTypes([]);
			}
		};

		const fetchUserBuildings = async () => {
			const url = `${API_BASE_URL}/user/buildings`;

			try {
				const response = await axios.get(url, {
					withCredentials: true
				});

				for (const building of response.data) {
					if (building.buildingType.name === "Siedziba") {
						setHaveHeadquarter(true);
						break;
					}
				}

			} catch (error) {
				console.error("Error fetching building types:", error);
			}
		}

		const fetchUserDetails = async () => {
			const url = `${API_BASE_URL}/user/details`;

			try {
				const response = await axios.get(url, {
					withCredentials: true
				});

				setUserMoney(response.data.accountBalance);

			} catch (error) {
				setUserMoney(0);
				console.error("Error fetching building types:", error);
			}
		}

		fetchBuildingTypes();
		fetchUserBuildings();
		fetchUserDetails();
	}, [])

	// TEMP
	const price = 4000;

	return (
		<motion.div className={styles.building_configuration}
			initial={{ x: "100%" }}
			animate={{ x: 0 }}
			transition={{ duration: 0.3 }} >
			<header className={styles.header}>
				<h2>Konfiguracja działki</h2>
				<Button
					icon={CloseIcon}
					iconType='only-icon'
					style='secondary'
					size="small"
					onClick={() => setShowBuildingConfiguration(false)}
				/>
			</header>
			<div className={styles.building_info}>
				<span>Informacje</span>
				<h3>Miejscowość {building.city}</h3>
				<p>{building.street && "ul. " + building.street} {building.number}</p>
			</div>
			<div className={styles.building_type_wrapper}>
				<span>Typ budowli</span>
				<h3>Wybierz typ budynku</h3>
				<div className={styles.building_type_container}>
					{buildingTypes.length > 0 && buildingTypes.map((type) => (
						<div key={type.id} className={`${styles.building_type} ${(type.name === "Siedziba" && haveHeadquarter) ? styles.disabled : ""} ${selectedBuildingType?.id === type.id ? styles.active : ""}`} onClick={() => handleBuildingTypeSelect(type)}>
							<h4>{type.name}</h4>
							<p>Maksymalna liczba pracowników, pojazdów i naczep: {type.driverCapacity}</p>
							{type.radius != 0 && (
								<p>Zasięg działania: {type.radius} km</p>
							)}
						</div>
					))}
				</div>
			</div>
			<div className={styles.building_price}>
				<span>Cena</span>
				{/* TODO */}
				<div className={styles.price_info}>
					<div >
						<p>Całkowita kwota: </p>
						<h3>{price} PLN</h3>
						{/* <h3>{selectedBuildingType.price} PLN</h3> */}
					</div>
					<div className={styles.user_money}>
						{/* {userMoney < selectedBuildingType.price ? (
							<span>Niewystarczające środki</span>
						) : (
							<>
								<p>Stan konta po zakupie: </p>
								<span>{userMoney - selectedBuildingType.price} PLN</span>
							</>
						)} */}
						{userMoney < price ? (
							<span>Niewystarczające środki</span>
						) : (
							<>
								<p>Stan konta po zakupie: </p>
								<span>{userMoney - price} PLN</span>
							</>
						)}
					</div>
				</div>
			</div>
			<Button text="Kup działkę z budynkiem" style="primary" disabled={!canBuyBuilding()} onClick={handleBuyBuilding} />
		</motion.div>
	)
}

const BuildingPlaceholders = () => {
	const BuildingPlaceholder = () => {
		return (
			<div className={styles.placeholder}>
				<div className={styles.header}>
					<span className={styles.primary}></span>
					<span className={styles.secondary}></span>
				</div>

				<div className={styles.actions}>
					<span className={styles.primary}></span>
					<span className={styles.primary}></span>
				</div>
			</div>
		)
	}
	return (
		<div className={styles.building_placeholder_container}>
			<BuildingPlaceholder />
			<BuildingPlaceholder />
			<BuildingPlaceholder />
			<BuildingPlaceholder />
			<BuildingPlaceholder />
		</div>
	);
}