import L, { LatLng, LeafletMouseEvent } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { City } from "../../types/types";

import currentMarkerImg from "../../assets/worker_icon.png";
import { useMap } from "react-leaflet";

type Coordinate = {
	lat: number;
	lng: number;
};

const formatTime = (seconds: number): string => {
	const hour = Math.floor(seconds / 3600);
	const min = Math.floor((seconds % 3600) / 60);
	const sec = Math.floor(seconds % 60);

	if (hour > 0) {
		return `${hour} godzin, ${min} minut`;
	} else if (min > 0) {
		return `${min} minut, ${sec} sekund`;
	} else {
		return `${sec} sekund`;
	}
};

const formatDistance = (meters: number): string => {
	const km = Math.floor(meters / 1000);
	const remainingMeters = meters % 1000;

	if (km > 0) {
		if (remainingMeters > 0) {
			return `${km.toFixed(0)} kilometr${
				km !== 1 ? "y" : ""
			}, ${remainingMeters.toFixed(0)} metr${remainingMeters !== 1 ? "y" : ""}`;
		} else {
			return `${km.toFixed(0)} kilometr${km !== 1 ? "y" : ""}`;
		}
	} else {
		return `${remainingMeters.toFixed(0)} metr${
			remainingMeters !== 1 ? "y" : ""
		}`;
	}
};

const formatDate = (date: Date) => {
	const hours = date.getHours();
	const min = date.getMinutes();

	return `${String(hours).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
};

const transformCityToLatLng = (city: City): LatLng => {
	return L.latLng(parseFloat(city.lat), parseFloat(city.lng));
};

// Display when clicking on marker icon on map
const handleMarkerClick = (
	e: LeafletMouseEvent,
	coordinates: L.LatLng[],
	totalTime: number,
	totalDistance: number,
	startTime: number
) => {
	// TODO Display information about transport

	// Calculate percent of route that have been driven
	console.log(coordinates);
	const currentLatLng = e.latlng;
	const routeLength = coordinates.length - 1;
	let drivenPercentage = 0;

	coordinates.map((coord, index) => {
		if (coord.lat === currentLatLng.lat && coord.lng === currentLatLng.lng) {
			drivenPercentage = (index / routeLength) * 100;
		}
	});

	// Calculate remaining distance
	const distanceTraveled = (drivenPercentage / 100) * totalDistance;
	const remainingDistance = totalDistance - distanceTraveled;

	// Calculate remaining time based on remaining distance
	const remainingTime = (remainingDistance / totalDistance) * totalTime;

	// Calculate elapsed time from start
	const currentTime = Date.now();
	const elapsedTime = (currentTime - startTime) / 1000;

	alert(
		`Procent przejechanej trasy: ${drivenPercentage.toFixed(
			2
		)}%\nPrzejechano: ${formatDistance(
			distanceTraveled
		)}\nPozostało do przejechania: ${formatDistance(
			remainingDistance
		)}\nCzas od startu: ${formatTime(
			elapsedTime
		)}\nPrzybliżony czas do celu: ${formatTime(
			remainingTime
		)}\nGodzina rozpoczęcia: ${formatDate(
			new Date(startTime)
		)}\nPrzybliżona godzina zakończenia: ${formatDate(
			new Date(startTime + totalTime * 1000)
		)}`
	);
};

const createRoutineMachineLayer = (start: City, end: City, map: L.Map) => {
	const waypoints = [transformCityToLatLng(start), transformCityToLatLng(end)];

	const instance = L.Routing.control({
		waypoints: waypoints,
		show: false,
		lineOptions: {
			extendToWaypoints: true,
			missingRouteTolerance: 1,
			styles: [
				{
					color: "red",
				},
			],
		},
	}).on("routesfound", (e) => {
		// Move the currentMarker along the route
		const route = e.routes[0];
		const coordinates = route.coordinates;
		const totalTime = route.summary.totalTime; // time needed for whole route in seconds
		const totalRoute = route.summary.totalDistance; // distance for whole route in meters
		const startTime = Date.now();

		// Create a marker to represent the current position along the route
		const currentMarker = L.marker(waypoints[0], {
			icon: L.icon({
				iconUrl: currentMarkerImg, // specify your current position marker icon
				iconSize: [40, 40],
				iconAnchor: [40, 40],
			}),
		})
			.on("click", (e: L.LeafletMouseEvent) =>
				handleMarkerClick(e, coordinates, totalTime, totalRoute, startTime)
			)
			.addTo(map);

		// Clear any previous markers (if needed)
		map.eachLayer((layer) => {
			if (layer instanceof L.Marker && layer !== currentMarker) {
				map.removeLayer(layer);
			}
		});

		// Calculate interval for each coordinate, so time needed will be realistic
		const interval = (totalTime / coordinates.length) * 1000;

		// Update position of marker for each coordinate
		coordinates.forEach((coord: Coordinate, index: number) => {
			setTimeout(() => {
				currentMarker.setLatLng([coord.lat, coord.lng]);
			}, interval * index);
		});
	});

	return instance;
};

interface RoutingControlProps {
	startCity: City | undefined;
	endCity: City | undefined;
}

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingControl = ({ startCity, endCity }: RoutingControlProps) => {
	const map = useMap();

	if (startCity && endCity) {
		const RoutingControlComponent = createControlComponent(() =>
			createRoutineMachineLayer(startCity, endCity, map)
		);
		return <RoutingControlComponent />;
	}
};

// Export
export default RoutingControl;
