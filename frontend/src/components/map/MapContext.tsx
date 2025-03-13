import React, { createContext, useContext, useRef, useState } from "react";
import { Map as LeafletMap, LatLngExpression } from "leaflet";
import { Props } from "../../types/sidebar";
import { MarkerProps } from "react-leaflet";

interface IMapContext {
    mapRef: React.RefObject<LeafletMap | null>;
    markerRefs: React.RefObject<any>;
    markers: MarkerProps[] | null;
    activeMarker: MarkerProps | undefined;
    setActiveMarker: (marker: MarkerProps | undefined) => void;
    setMapRef: (mapInstance: LeafletMap) => void;
    zoomToMarker: (coordinates: LatLngExpression, zoom?: number) => void;
    setMarkers: (markers: MarkerProps[] | null) => void;
    clearMarkers: () => void;
    openMarkerPopup: (lat: number, lng: number) => void;
}

const initialMapContext: IMapContext = {
    mapRef: { current: null },
    markerRefs: { current: [] },
    markers: null,
    activeMarker: undefined,
    setActiveMarker: () => { },
    setMapRef: () => { },
    zoomToMarker: () => { },
    setMarkers: () => { },
    clearMarkers: () => { },
    openMarkerPopup: () => { },
};

export const MapContext = createContext<IMapContext>(initialMapContext);

export const MapProvider = ({ children }: Props) => {
    const mapRef = useRef<LeafletMap | null>(null);
    const markerRefs = useRef<(L.Marker | null)[]>([]);
    const [markers, setMarkers] = useState<MarkerProps[] | null>(null);
    const [activeMarker, setActiveMarker] = useState<MarkerProps | undefined>(undefined);

    const setMapRef = (mapInstance: LeafletMap) => {
        mapRef.current = mapInstance;
    };

    const zoomToMarker = (coordinates: LatLngExpression, zoom: number = 12) => {
        if (mapRef.current) {
            mapRef.current.flyTo(coordinates, zoom, { animate: true });
        }
    };

    const openMarkerPopup = (lat: number, lng: number) => {
        if (markers) {


            const markerIndex = markers.findIndex(
                (marker) => marker.position.toString() === [lat, lng].toString()
            );

            const selectedMarkerRef = markerRefs.current[markerIndex];
            if (markerIndex !== -1) {
                selectedMarkerRef?.openPopup();
            }

        }
    }

    const clearMarkers = () => {
        setMarkers(null);
        setActiveMarker(undefined);
    };

    return (
        <MapContext.Provider value={{ mapRef, setMapRef, zoomToMarker, setMarkers, activeMarker, setActiveMarker, markers, clearMarkers, openMarkerPopup, markerRefs }}>
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => useContext(MapContext);
