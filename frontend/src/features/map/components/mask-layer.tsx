import { useEffect } from 'react';
import { useMap } from '../../../components/ui/map';

function MapMaskLayer() {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!isLoaded || !map) {
      return;
    }

    const setupLayers = () => {
      try {
        if (!map.getSource('poland-mask')) {
          map.addSource('poland-mask', {
            type: 'geojson',
            data: '/poland-mask.geojson',
          });
        }

        if (!map.getLayer('country-mask')) {
          map.addLayer({
            id: 'country-mask',
            type: 'fill',
            source: 'poland-mask',
            paint: {
              'fill-color': '#0c0a09',
              'fill-opacity': 0.6,
            },
          });
        }
      } catch (error) {
        console.warn('Error setting up map mask layer:', error);
      }
    };

    setupLayers();
  }, [map, isLoaded]);

  return null;
}

export { MapMaskLayer };
