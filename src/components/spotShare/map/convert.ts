import { AlertError } from '../../common/modal/alert';

// 위도, 경도 -> 주소 변환 함수
export const getAddress = async (lat: number, lng: number, setAddress: (address: string | null) => void) => {
  const geocoder = new google.maps.Geocoder();
  const latlng = { lat: lat, lng: lng };
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        AlertError({ text: '결과가 없습니다.' });
      }
    } else {
      AlertError({ text: `다음의 이유로 주소 변환 과정에서 문제가 발생했습니다. ${status} 다시 한 번 시도해주세요!` });
    }
  });
};

// results의 address_components 중에서 country 타입 있는 걸 찾아서, 그 국가명(long_name) 뽑고, 한글 국가명으로 변환해서 반환하는 함수
export const processCountryComponent = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
  const countryComponent = addressComponents.find((component) => component.types.includes('country'));
  let clickedCountry: string | null = null;
  if (countryComponent) {
    const clickedCountryEnglish = countryComponent.long_name;
    clickedCountry = countryMapping[clickedCountryEnglish as keyof typeof countryMapping] || clickedCountryEnglish;
  }
  return clickedCountry;
};

// 국가 제한 설정 위한 mapping 정보
export const countryMapping = {
  Australia: '호주',
  'New Zealand': '뉴질랜드',
  Egypt: '이집트',
  'South Africa': '남아프리카공화국',
  Tanzania: '탄자니아',
  Ethiopia: '에티오피아',
  Kenya: '케냐',
  Namibia: '나미비아',
  Morocco: '모로코',
  USA: '미국',
  'United States': '미국',
  Canada: '캐나다',
  Mexico: '멕시코',
  Peru: '페루',
  Bolivia: '볼리비아',
  Chile: '칠레',
  Argentina: '아르헨티나',
  Cuba: '쿠바',
  Brazil: '브라질',
  France: '프랑스',
  Italy: '이탈리아',
  Türkiye: '터키',
  튀르키예: '터키',
  Spain: '스페인',
  UK: '영국',
  'United Kingdom': '영국',
  Austria: '오스트리아',
  Netherlands: '네덜란드',
  Germany: '독일',
  Switzerland: '스위스',
  Portugal: '포르투갈',
  Poland: '폴란드',
  Iceland: '아이슬란드',
  Finland: '핀란드',
  Sweden: '스웨덴',
  Norway: '노르웨이',
  Denmark: '덴마크',
  Greece: '그리스',
  Russia: '러시아',
  Ireland: '아일랜드',
  Hungary: '헝가리',
  Belgium: '벨기에',
  Czechia: '체코',
  Slovenia: '슬로베니아',
  'South Korea': '대한민국',
  Japan: '일본',
  China: '중국',
  'Hong Kong': '홍콩',
  Taiwan: '대만',
  Mongolia: '몽골',
  Singapore: '싱가포르',
  Vietnam: '베트남',
  Thailand: '태국',
  Indonesia: '인도네시아',
  Malaysia: '말레이시아',
  Philippines: '필리핀',
  Laos: '라오스',
  Cambodia: '캄보디아',
  'Myanmar (Burma)': '미얀마',
  Myanmar: '미얀마',
  'United Arab Emirates': '아랍에미리트',
  Oman: '오만',
  India: '인도',
  Nepal: '네팔',
  Israel: '이스라엘',
  Qatar: '카타르',
} as const;
