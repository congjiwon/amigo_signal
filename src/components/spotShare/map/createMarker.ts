import { AlertError } from '../../common/modal/alert';
import { getAddress, processCountryComponent } from './convert';

// 클릭 시 마커 추가하는 로직 함수
export const addMarker = (
  map: google.maps.Map,
  location: google.maps.LatLng,
  setLatitude: (lat: number | null) => void,
  setLongitude: (lng: number | null) => void,
  setAddress: (address: string | null) => void,
  countryRef: React.MutableRefObject<string | undefined>,
  markerRef: React.MutableRefObject<google.maps.Marker | null>,
) => {
  if (!countryRef.current) {
    AlertError({ text: '국가 정보가 없습니다. 국가를 먼저 선택해주세요.' });
    return;
  }

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location }, (results, status) => {
    if (status === 'OK' && results.length > 0) {
      // 선택된 국가와 일치하는 지 확인
      const matchedCountry = results.some((result) => {
        const clickedCountry = processCountryComponent(result.address_components);
        return clickedCountry === countryRef.current;
      });

      // 선택한 국가와 map에서 찍은 위치의 국가 정보가 일치하면 다음의 함수 실행
      if (matchedCountry) {
        createAndSetMarker(map, location, setLatitude, setLongitude, setAddress, markerRef);
      } else {
        AlertError({ text: `선택한 위치는 '${countryRef.current}'의 올바른 위치가 아닙니다. 올바른 위치를 선택해주세요.` });
      }
    } else {
      AlertError({ text: `다음의 이유로 주소 확인 과정에서 문제가 발생했습니다. ${status} 다시 한 번 시도해주세요!` });
    }
  });
};

// 이전 마커를 제거하고 새로운 마커를 추가하는 함수
export const createAndSetMarker = (
  map: google.maps.Map,
  location: google.maps.LatLng,
  setLatitude: (lat: number | null) => void,
  setLongitude: (lng: number | null) => void,
  setAddress: (address: string | null) => void,
  markerRef: React.MutableRefObject<google.maps.Marker | null>,
) => {
  // 이전 마커 제거
  if (markerRef.current) {
    markerRef.current.setMap(null);
  }

  // 새로운 마커 생성
  const newMarker = new google.maps.Marker({
    map: map,
    position: location,
  });
  markerRef.current = newMarker;

  // 마커의 위도와 경도 값 얻기
  const lat = location.lat();
  const lng = location.lng();

  // 위도와 경도, 주소 설정
  setLatitude(lat);
  setLongitude(lng);
  getAddress(lat, lng, setAddress);
};
