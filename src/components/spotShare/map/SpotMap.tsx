import React, { useEffect, useRef, useState } from 'react';

type SpotMapProps = {
  setLatitude: (lat: number | null) => void;
  setLongitude: (lng: number | null) => void;
};

const SpotMap = ({ setLatitude, setLongitude }: SpotMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const searchMarkerRef = useRef<google.maps.Marker | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [map, setMap] = useState<google.maps.Map | null>(null);

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

  // 클릭 시 마커 추가 함수
  const addMarker = (map: google.maps.Map, location: google.maps.LatLng) => {
    // 이전 클릭 마커 제거
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
    // 새로운 클릭 마커 생성
    const newMarker = new google.maps.Marker({
      map: map,
      position: location,
    });
    markerRef.current = newMarker;

    // 클릭한 마커의 위도와 경도 값 뽑아서
    const lat = location.lat();
    const lng = location.lng();
    // SpotShareUpdate 컴포넌트의 latitude와 longitude 상태 설정해주기
    setLatitude(lat);
    setLongitude(lng);
  };

  useEffect(() => {
    if (map) {
      // 클릭 시 마커 추가하는 이벤트 핸들러
      map.addListener('click', (e) => {
        addMarker(map, e.latLng);
      });
    }
  }, [map]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 장소 검색 (enter 키 쳤을 때도 실행되도록)
  const handleEnterToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // 장소 검색 ('검색' 버튼 클릭했을 때)
  const handleSearch = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    if (map) {
      const placeService = new google.maps.places.PlacesService(map);
      placeService.findPlaceFromQuery(
        {
          query: inputValue,
          fields: ['geometry'],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]?.geometry?.location) {
            const location = results[0].geometry?.location;
            map.setCenter(location);
            map.setZoom(17);
            // 이전 검색 마커 제거
            if (searchMarkerRef.current) {
              searchMarkerRef.current.setMap(null);
            }
            // 새로운 검색 마커 추가
            const newMarker = new google.maps.Marker({
              map: map,
              position: location,
            });
            searchMarkerRef.current = newMarker;
          }
        },
      );
    }
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <input type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterToSearch} placeholder="장소를 검색하세요!" />
      <button type="button" onClick={handleSearch}>
        검색
      </button>

      <div ref={mapRef} style={{ width: '100%', height: '50vh', marginTop: '20px' }} />
    </div>
  );
};

export default SpotMap;
