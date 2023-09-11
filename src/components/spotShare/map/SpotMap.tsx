import { useEffect, useRef, useState } from 'react';
import { AddressSearch } from './AddressSearch';
import { addMarker, createAndSetMarker } from './createMarker';

type SpotMapProps = {
  setLatitude: (lat: number | null) => void;
  setLongitude: (lng: number | null) => void;
  address: string | null;
  setAddress: (address: string | null) => void;
  country: string;
};

const SpotMap = ({ setLatitude, setLongitude, address, setAddress, country }: SpotMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const countryRef = useRef<string | undefined>(country);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

  // 선택한 국가 변경 시, countryRef 업데이트
  useEffect(() => {
    countryRef.current = country;
    setSelectedCountry(countryRef.current);
  }, [country]);

  // Google Maps API가 로드되었는지 확인하고 지도 초기화
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
        setMap(map);
      }
    };

    if (checkIfGoogleIsLoaded()) {
      initializeMap();
    } else {
      const googleMapScript = document.querySelector('script[src*="googleapis"]');
      googleMapScript?.addEventListener('load', initializeMap);
    }
  }, []);

  // 지도 클릭 시, 마커 추가하는 이벤트 핸들러
  useEffect(() => {
    if (map) {
      map.addListener('click', (e) => {
        addMarker(map, e.latLng, setLatitude, setLongitude, setAddress, countryRef, markerRef);
      });
    }
  }, [map]);

  // 검색 시, 지도 중심 조정 및 마커 추가하는 함수
  const setMarkerOnMap = (location: google.maps.LatLng) => {
    if (!map) return;
    map.setCenter(location);
    map.setZoom(17);
    createAndSetMarker(map, location, setLatitude, setLongitude, setAddress, markerRef);
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <AddressSearch map={map} setLatitude={setLatitude} setLongitude={setLongitude} setAddress={setAddress} address={address} selectedCountry={selectedCountry} setMarkerOnMap={setMarkerOnMap} />
      <div ref={mapRef} style={{ width: '100%', height: '50vh', marginTop: '20px' }} />
    </div>
  );
};

export default SpotMap;
