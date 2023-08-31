import { Select, Space } from 'antd';
import React, { useState } from 'react';

interface PartnerProps {
  setPartner: React.Dispatch<React.SetStateAction<number>>;
}
interface StarProps {
  setStar: React.Dispatch<React.SetStateAction<number>>;
}
interface SortProps {
  setSort: React.Dispatch<React.SetStateAction<number>>;
}
interface LocationProps {
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
}

interface RecruitmentProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export function PartnerDropDown({ setPartner }: PartnerProps) {
  const handleChange = (value: string) => {
    setPartner(Number(value));
  };
  return (
    <Space wrap>
      <Select
        placeholder="모집인원"
        style={{ width: '100%' }}
        onChange={handleChange}
        options={[
          { value: '1', label: '1명' },
          { value: '2', label: '2명' },
          { value: '3', label: '3명' },
          { value: '4', label: '4명' },
          { value: '5', label: '5명' },
          { value: '6', label: '6명' },
          { value: '7', label: '7명' },
          { value: '8', label: '8명' },
          { value: '9', label: '9명' },
          { value: '10', label: '10명' },
        ]}
      />
    </Space>
  );
}

export function StarDropDown({ setStar }: StarProps) {
  const handleChange = (value: string) => {
    setStar(Number(value));
  };
  return (
    <Space wrap>
      <Select
        defaultValue="⭐⭐⭐⭐⭐"
        style={{ width: '140px' }}
        onChange={handleChange}
        options={[
          { value: '5', label: '⭐⭐⭐⭐⭐' },
          { value: '4', label: '⭐⭐⭐⭐' },
          { value: '3', label: '⭐⭐⭐' },
          { value: '2', label: '⭐⭐' },
          { value: '1', label: '⭐' },
        ]}
      />
    </Space>
  );
}

export function SortDropDown({ setSort }: SortProps) {
  const handleChange = (value: string) => {
    setSort(Number(value));
  };
  return (
    <Space wrap>
      <Select
        defaultValue="최신순"
        style={{ width: 140 }}
        onChange={handleChange}
        options={[
          { value: '1', label: '최신순' },
          { value: '2', label: '인기순' },
        ]}
      />
    </Space>
  );
}

export function LocationDropDown({ setLocation }: LocationProps) {
  const provinceData = ['아시아', '유럽', '아메리카', '오세아니아', '아프리카'];

  const cityData = {
    아시아: ['대한한국', '일본', '홍콩', '마카오', '대만', '중국', '몽골', '싱가포르', '베트남', '태국', '인도네시아', '말레이시아', '필리핀', '라오스', '캄보디아', '미얀마', '아랍에미리트', '오만', '인도', '네팔', '이스라엘', '카타르'],
    유럽: [
      '프랑스',
      '이탈리아',
      '터키',
      '스페인',
      '영국',
      '오스트리아',
      '네덜란드',
      '독일',
      '스위스',
      '포르투칼',
      '폴란드',
      '아이슬란드',
      '필란드',
      '스웨덴',
      '노르웨이',
      '덴마크',
      '그리스',
      '러시아',
      '아일랜드',
      '헝가리',
      '벨기에',
      '체코',
      '슬로베니아',
    ],
    아메리카: ['미국', '캐나다', '멕시코', '페루', '볼리비아', '칠레', '아르헨티나', '쿠바', '브라질', '에콰도르', '콜롬비아', '파라과이', '우루과이', '베네수엘라'],
    오세아니아: ['호주', '뉴질랜드'],
    아프리카: ['이집트', '남아프리카공화국', '탄자니아', '에티오피아', '케냐', '나미비아', '모로코'],
  };

  type CityName = keyof typeof cityData;

  const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);
  const [copy, setCopy] = useState<string>(provinceData[0]);

  const handleProvinceChange = (value: CityName) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
    setLocation([value, cityData[value][0]]);
    setCopy(value);
  };

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value);
    setLocation([copy, value]);
  };

  return (
    <Space wrap>
      <Select defaultValue={provinceData[0] as CityName} style={{ width: 120 }} onChange={handleProvinceChange} options={provinceData.map((province) => ({ label: province, value: province }))} />
      <Select style={{ width: 120 }} value={secondCity as CityName} onChange={onSecondCityChange} options={cities.map((city) => ({ label: city, value: city }))} />
    </Space>
  );
}

export function RecruitmentDropDown({ setIsOpen }: RecruitmentProps) {
  const handleChange = (value: boolean | undefined) => {
    setIsOpen(value);
  };
  return (
    <Space wrap>
      <Select
        placeholder="모집중"
        style={{ width: '140px' }}
        onChange={handleChange}
        allowClear
        options={[
          { value: true, label: '모집중' },
          { value: false, label: '모집완료' },
        ]}
      />
    </Space>
  );
}

// 사용법

// const [star, setStar] = useState<number>(5);
// const [partner, setPartner] = useState<number>(1);
// const [sort, setSort] = useState<number>(1);
// const [location, setLocation] = useState<string[]>([]);
// const [isOpen, setIsOpen] = useState<boolean>();

// <StarDropDown setStar={setStar} />
// <PartnerDropDown setPartner={setPartner} />
// <SortDropDown setSort={setSort} />
// <LocationDropDown setLocation={setLocation} />
// <RecruitmentDropDown setIsOpen={setIsOpen} />
