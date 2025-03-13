import { MapContainer, TileLayer, GeoJSON, Marker, useMap, Popup } from "react-leaflet";
import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";
import data from "../../../geoPoland.json";
import { GeoJsonObject } from "geojson";
// import { City } from "../../../types/types";
import "leaflet-routing-machine";
// import RoutingControl from "../RoutingControl";
import { useMap as useMapLocal } from "../MapContext";
import { Icon } from "leaflet"

import baseMarkerIcon from "../../../assets/markers/marker-icon-2x-foreground.webp"
import activeMarkerIcon from "../../../assets/markers/marker-icon-2x-active.webp"
import markerShadow from "../../../assets/markers/marker-shadow.webp"

const Map = () => {
	const geo = data as GeoJsonObject;


	//Map Routing
	// Start-End points for the routing machine:
	// const [start, setStart] = useState<City>();
	// const [end, setEnd] = useState<City>();

	return (
		<MapContainer
			center={[52, 19]}
			zoom={6}
			minZoom={6}
			id={styles.map}
		>
			{/* <RoutingControl startCity={start} endCity={end} /> */}
			<MapController />
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<MarkersList />

			<GeoJSON
				data={geo}
				pathOptions={{
					color: "#2a2a2a",
					lineCap: "round",
					fill: true,
					weight: 1,
					fillOpacity: 0.7
				}}
			/>
		</MapContainer>
	);
};

export default Map;


const MapController = () => {
	const map = useMap();
	const { setMapRef } = useMapLocal();
	setMapRef(map);

	return <></>
}

const MarkersList = () => {
	// Markers
	const { markers, setActiveMarker, activeMarker, zoomToMarker, markerRefs } = useMapLocal();

	const baseMarkerStyle = new Icon({
		iconUrl: baseMarkerIcon,
		shadowUrl: markerShadow,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	const activeMarkerStyle = new Icon({
		iconUrl: activeMarkerIcon,
		shadowUrl: markerShadow,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	const handleMarkerClick = (index: number) => {
		if (!markers) return;

		const selectedMarker = markers[index];


		setActiveMarker(selectedMarker)
		zoomToMarker(selectedMarker.position);
	}

	const formatMarkerPopupDetails = (details: string | undefined) => {
		const formattedString = details?.toString();
		const street = formattedString?.split(",")[0].split(":")[1];
		const number = formattedString?.split(",")[1].split(":")[1];

		return (
			<span>{`${street && "Ul. " + street + " " + number}`} </span>
		)
	}



	return (
		<>
			{markers && markers.length > 0 && markers.map((marker, index) => (
				<Marker key={index} {...marker} ref={(el) => {
					markerRefs.current[index] = el;
				}} icon={
					activeMarker?.position?.toString() === marker.position?.toString()
						? activeMarkerStyle
						: baseMarkerStyle
				} eventHandlers={{
					click: () => handleMarkerClick(index)
				}}>
					<Popup className={styles.popup} closeButton={false}>
						<div className={styles.popupContent}>
							<h3 className={styles.popupTitle}>Działka pod zabudowę</h3>
							<div className={styles.popupInfo}>
								<span>Miejscowość: <strong>{marker.title}</strong> </span>
								{formatMarkerPopupDetails(marker.alt)}
							</div>

						</div>
					</Popup>
				</Marker>
			))}

		</>
	)
}