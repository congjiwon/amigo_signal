import { useEffect, useRef, useState } from 'react';
import { AddressSearch } from './AddressSearch';
import { addMarker, createAndSetMarker } from './createMarker';
import * as St from './style';

type SpotMapUpdateProps = {
  latitude: number | null | undefined;
  setLatitude: (lat: number | null) => void;
  longitude: number | null | undefined;
  setLongitude: (lng: number | null) => void;
  address: string | null;
  setAddress: (address: string | null) => void;
  country: string;
  defaultCountry: string;
};

const SpotMapUpdate = ({ latitude, setLatitude, longitude, setLongitude, address, setAddress, country, defaultCountry }: SpotMapUpdateProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const countryRef = useRef<string | undefined>(defaultCountry);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

  useEffect(() => {
    if (countryRef.current !== undefined) {
      setSelectedCountry(countryRef.current);
    }
  }, []);

  // 선택한 국가 변경 시, countryRef 업데이트
  useEffect(() => {
    if (country !== undefined) {
      setSelectedCountry(country);
      countryRef.current = country;
    }
  }, [country]);

  // Google Maps API가 로드되었는지 확인하고 지도 초기화
  useEffect(() => {
    const checkIfGoogleIsLoaded = () => {
      return typeof window.google === 'object' && typeof window.google.maps === 'object';
    };

    const initializeMap = () => {
      if (mapRef.current) {
        const defaultLocation = new google.maps.LatLng(latitude!, longitude!);
        const map = new google.maps.Map(mapRef.current, {
          zoom: 12,
          center: defaultLocation,
        });
        createAndSetMarker(map, defaultLocation, setLatitude, setLongitude, setAddress, markerRef);
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
    <St.AddressSearchBox>
      <AddressSearch map={map} setLatitude={setLatitude} setLongitude={setLongitude} setAddress={setAddress} address={address} selectedCountry={selectedCountry} setMarkerOnMap={setMarkerOnMap} />
      <div ref={mapRef} style={{ width: '100%', height: '50vh', marginTop: '20px' }} />
    </St.AddressSearchBox>
  );
};

export default SpotMapUpdate;
