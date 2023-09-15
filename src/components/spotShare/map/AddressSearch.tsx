import { useState } from 'react';
import { AlertError } from '../../common/modal/alert';
import { processCountryComponent } from './convert';
import * as St from './style';

type AddressSearchProps = {
  map: google.maps.Map | null;
  setLatitude: (lat: number | null) => void;
  setLongitude: (lng: number | null) => void;
  setAddress: (address: string | null) => void;
  address: string | null;
  selectedCountry: string | undefined;
  setMarkerOnMap: (location: google.maps.LatLng) => void;
};

export const AddressSearch = ({ map, setLatitude, setLongitude, setAddress, address, selectedCountry, setMarkerOnMap }: AddressSearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');

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

    if (!map) return;

    if (!selectedCountry) {
      AlertError({ text: '국가 정보가 없습니다. 국가를 먼저 선택해주세요.' });
      return;
    }

    const placeService = new google.maps.places.PlacesService(map);
    placeService.findPlaceFromQuery(
      {
        query: inputValue,
        fields: ['geometry', 'place_id'],
      },
      (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          AlertError({ text: `장소 검색 중 오류가 발생했습니다. 다시 시도해주세요.` });
          return;
        }

        const location = results[0]?.geometry?.location;
        const placeId = results[0]?.place_id;

        if (!location || !placeId) return;

        placeService.getDetails(
          {
            placeId: placeId,
            fields: ['address_components'],
          },
          (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
              AlertError({ text: `상세 주소 정보 가져오기 중 오류가 발생했습니다. 다시 시도해주세요.` });
              return;
            }

            // 선택된 국가와 일치하는 지 확인
            const searchedCountry = processCountryComponent(place.address_components || []);
            if (searchedCountry !== selectedCountry) {
              AlertError({ text: `검색한 위치는 '${selectedCountry}'의 올바른 위치가 아닙니다. 올바른 위치를 검색해주세요.` });
              return;
            }

            setMarkerOnMap(location);
          },
        );
      },
    );
  };

  const handleClearAddress = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setInputValue('');
    setLatitude(null);
    setLongitude(null);
    setAddress('');
  };

  return (
    <St.SearchAddressBox>
      <St.SearchAddress>
        <input type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterToSearch} placeholder="방문한 장소를 검색하세요!" />
        <button type="button" onClick={handleSearch}>
          검색
        </button>
      </St.SearchAddress>
      <St.Address>
        <p>{address ? address : `검색한 주소가 표시됩니다`}</p>
        <button onClick={handleClearAddress}>지도 초기화</button>
      </St.Address>
    </St.SearchAddressBox>
  );
};
