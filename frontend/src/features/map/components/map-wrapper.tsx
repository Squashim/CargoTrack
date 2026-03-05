import { Map, MapControls, useMap } from '@/components/ui/map';
import { MAP_SETTINGS } from '@/lib/constants';
import { LoadingPage } from '@/pages/loading';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { MapMaskLayer } from './mask-layer';

function MapWrapper({ children }: PropsWithChildren) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div className="h-full w-full relative">
      {!isMapLoaded && <LoadingPage className="absolute inset-0 bg-background z-49" />}

      <Map {...MAP_SETTINGS}>
        <MapLoadController onLoad={() => setIsMapLoaded(true)} />
        <MapMaskLayer />
        <MapControls />
        {children}
      </Map>
    </div>
  );
}

function MapLoadController({ onLoad }: { onLoad: () => void }) {
  const { isLoaded } = useMap();
  const MASK_LOAD_DURATION = 500;

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        onLoad();
      }, MASK_LOAD_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, onLoad]);

  return null;
}

export { MapWrapper };
