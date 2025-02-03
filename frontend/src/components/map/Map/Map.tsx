import { LatLngBoundsExpression } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import styles from "./Map.module.scss";
import "leaflet/dist/leaflet.css";

import data from "../../../geoPoland.json";
import { GeoJsonObject } from "geojson";
import { useState } from "react";

import { City } from "../../../types/types";

// const cities: City[] = [
// 	{
// 		city: "Warszawa",
// 		city_ascii: "Warsaw",
// 		lat: "52.2297",
// 		lng: "21.0122",
// 		country: "Poland",
// 		iso2: "PL",
// 		iso3: "POL",
// 		admin_name: "Mazowieckie",
// 		capital: "primary",
// 		population: "1790658",
// 		id: "1234567890",
// 	},
// 	{
// 		city: "Kraków",
// 		city_ascii: "Krakow",
// 		lat: "50.0647",
// 		lng: "19.9450",
// 		country: "Poland",
// 		iso2: "PL",
// 		iso3: "POL",
// 		admin_name: "Małopolskie",
// 		capital: "admin",
// 		population: "779115",
// 		id: "0987654321",
// 	},
// 	{
// 		city: "Gdynia",
// 		city_ascii: "Gdynia",
// 		lat: "54.5189",
// 		lng: "18.5305",
// 		country: "Poland",
// 		iso2: "PL",
// 		iso3: "POL",
// 		admin_name: "Pomeranian",
// 		capital: "none",
// 		population: "246882",
// 		id: "1122334455",
// 	},
// 	{
// 		city: "Gdańsk",
// 		city_ascii: "Gdansk",
// 		lat: "54.3520",
// 		lng: "18.6466",
// 		country: "Poland",
// 		iso2: "PL",
// 		iso3: "POL",
// 		admin_name: "Pomeranian",
// 		capital: "admin",
// 		population: "470907",
// 		id: "2233445566",
// 	},
// 	{
// 		city: "Lublin",
// 		city_ascii: "Lublin",
// 		lat: "51.2465",
// 		lng: "22.5680",
// 		country: "Poland",
// 		iso2: "PL",
// 		iso3: "POL",
// 		admin_name: "Lublin",
// 		capital: "admin",
// 		population: "339850",
// 		id: "3344556677",
// 	},
// 	{
// 		city: "Katowice",
// 		city_ascii: "Katowice",
// 		lat: "50.2649",
// 		lng: "19.0238",
// 		country: "Poland",
// 		iso2: "PL",
// 		iso3: "POL",
// 		admin_name: "Silesian",
// 		capital: "admin",
// 		population: "291774",
// 		id: "4455667788",
// 	},
// 	{
// 		city: "Piastów",
// 		city_ascii: "Piastow",
// 		lat: "52.187599",
// 		lng: "20.840460",
// 		country: "Poland",
// 		iso2: "PL",
// 		iso3: "POL",
// 		admin_name: "Mazowieckie",
// 		capital: "admin",
// 		population: "9896",
// 		id: "4455667789",
// 	},
// ];

import "leaflet-routing-machine";
import RoutingControl from "../RoutingControl";

const Map = () => {
	const geo = data as GeoJsonObject;
	const polandBounds: LatLngBoundsExpression = [
		[48.518979341691306, 13.08242015352293],
		[55.41272921596102, 25.01484467568801]
	];

	//Map Routing
	// Start-End points for the routing machine:
	const [start, setStart] = useState<City>();
	const [end, setEnd] = useState<City>();

	return (
		<MapContainer
			center={[52, 19]}
			zoom={6}
			maxBounds={polandBounds}
			minZoom={6}
			id={styles.map}
			maxBoundsViscosity={0.7}>
			<RoutingControl startCity={start} endCity={end} />
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

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
