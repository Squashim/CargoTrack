import { useEffect, useRef, useState } from "react";
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


const BuildingMarket = () => {
	const [selectedProvince, setSelectedProvince] = useState<string>("");
	const [buildings, setBuildings] = useState<BuildingLocation[]>([]);
	const { setMarkers, zoomToMarker, setActiveMarker, clearMarkers, activeMarker, openMarkerPopup } = useMap();
	const { activeDashboardElement } = useDashboard();

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
				setBuildings(response.data);

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

		if (activeDashboardElement === "real-estate-market") {
			fetchProvinceBuildings();
		} else {
			clearMarkers();
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
		}
	}, [activeMarker]);


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
									<Button style="tertiary" text="Konfiguruj działkę" size="small" />
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
		</>
	);
};

export default BuildingMarket;

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