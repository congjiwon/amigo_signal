import { useEffect, useRef } from 'react';

const SpotMap: React.FC = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const checkIfGoogleIsLoaded = () => {
      return typeof window.google === 'object' && typeof window.google.maps === 'object';
    };

    const initializeMap = () => {
      if (mapRef.current) {
        const seoul = { lat: 37.5642135, lng: 127.0016985 };
        const map = new google.maps.Map(mapRef.current, {
          zoom: 12,
          center: seoul,
        });
      }
    };

    if (checkIfGoogleIsLoaded()) {
      initializeMap();
    } else {
      const googleMapScript = document.querySelector('script[src*="googleapis"]');
      googleMapScript?.addEventListener('load', initializeMap);
    }
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '50vh' }} />;
};

export default SpotMap;
