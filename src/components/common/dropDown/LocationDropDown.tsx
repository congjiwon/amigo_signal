import React from 'react';
import { Cascader } from 'antd';

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
}

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: '아시아',
    label: '아시아',
    children: [
      {
        value: '대한민국',
        label: '대한민국',
      },
      {
        value: '일본',
        label: '일본',
      },
      {
        value: '홍콩',
        label: '홍콩',
      },
      {
        value: '마카오',
        label: '마카오',
      },
      {
        value: '중국',
        label: '중국',
      },
      {
        value: '몽골',
        label: '몽골',
      },
      {
        value: '싱가포르',
        label: '싱가포르',
      },
      {
        value: '베트남',
        label: '베트남',
      },
      {
        value: '태국',
        label: '태국',
      },
      {
        value: '인도네시아',
        label: '인도네시아',
      },
      {
        value: '말레이시아',
        label: '말레이시아',
      },
      {
        value: '필리핀',
        label: '필리핀',
      },
      {
        value: '라오스',
        label: '라오스',
      },
      {
        value: '캄보디아',
        label: '캄보디아',
      },
      {
        value: '미얀마',
        label: '미얀마',
      },
      {
        value: '아랍에미리트',
        label: '아랍에미리트',
      },
      {
        value: '오만',
        label: '오만',
      },
      {
        value: '인도',
        label: '인도',
      },
      {
        value: '네팔',
        label: '네팔',
      },
      {
        value: '이스라엘',
        label: '이스라엘',
      },
      {
        value: '카타르',
        label: '카타르',
      },
    ],
  },
  {
    value: '유럽',
    label: '유럽',
    children: [
      {
        value: '프랑스',
        label: '프랑스',
      },
      {
        value: '이탈리아',
        label: '이탈리아',
      },
      {
        value: '터키',
        label: '터키',
      },
      {
        value: '스페인',
        label: '스페인',
      },
      {
        value: '영국',
        label: '영국',
      },
      {
        value: '오스트리아',
        label: '오스트리아',
      },
      {
        value: '네덜란드',
        label: '네덜란드',
      },
      {
        value: '독일',
        label: '독일',
      },
      {
        value: '스위스',
        label: '스위스',
      },
      {
        value: '포르투칼',
        label: '포르투칼',
      },
      {
        value: '폴란드',
        label: '폴란드',
      },
      {
        value: '아이슬란드',
        label: '아이슬란드',
      },
      {
        value: '필란드',
        label: '필란드',
      },
      {
        value: '스웨덴',
        label: '스웨덴',
      },
      {
        value: '노르웨이',
        label: '노르웨이',
      },
      {
        value: '덴마크',
        label: '덴마크',
      },
      {
        value: '그리스',
        label: '그리스',
      },
      {
        value: '러시아',
        label: '러시아',
      },
      {
        value: '아일랜드',
        label: '아일랜드',
      },
      {
        value: '헝가리',
        label: '헝가리',
      },
      {
        value: '벨기에',
        label: '벨기에',
      },
      {
        value: '체코',
        label: '체코',
      },
      {
        value: '슬로베니아',
        label: '슬로베니아',
      },
    ],
  },
  {
    value: '아메리카',
    label: '아메리카',
    children: [
      {
        value: '미국',
        label: '미국',
      },
      {
        value: '캐나다',
        label: '캐나다',
      },
      {
        value: '멕시코',
        label: '멕시코',
      },
      {
        value: '페루',
        label: '페루',
      },
      {
        value: '볼리비아',
        label: '볼리비아',
      },
      {
        value: '칠레',
        label: '칠레',
      },
      {
        value: '아르헨티나',
        label: '아르헨티나',
      },
      {
        value: '쿠바',
        label: '쿠바',
      },
      {
        value: '브라질',
        label: '브라질',
      },
      {
        value: '에콰도르',
        label: '에콰도르',
      },
      {
        value: '콜롬비아',
        label: '콜롬비아',
      },
      {
        value: '파라과이',
        label: '파라과이',
      },
      {
        value: '우루과이',
        label: '우루과이',
      },
      {
        value: '베네수엘라',
        label: '베네수엘라',
      },
    ],
  },
  {
    value: '오세아니아',
    label: '오세아니아',
    children: [
      {
        value: '호주',
        label: '호주',
      },
      {
        value: '뉴질랜드',
        label: '뉴질랜드',
      },
    ],
  },
  {
    value: '아프리카',
    label: '아프리카',
    children: [
      {
        value: '이집트',
        label: '이집트',
      },
      {
        value: '남아프리카공화국',
        label: '남아프리카공화국',
      },
      {
        value: '탄자니아',
        label: '탄자니아',
      },
      {
        value: '에티오피아',
        label: '에티오피아',
      },
      {
        value: '케냐',
        label: '케냐',
      },
      {
        value: '나미비아',
        label: '나미비아',
      },
      {
        value: '모로코',
        label: '모로코',
      },
    ],
  },
];

function LocationDropDown({ setLocation }: Props) {
  const onChange = (value: string[]) => {
    const valueSplit = value[0].split(',');
    setLocation(valueSplit);
  };

  return <Cascader style={{ width: 140 }} options={options} onChange={(e) => onChange([String(e)])} placeholder="국가 선택" />;
}

export default LocationDropDown;
