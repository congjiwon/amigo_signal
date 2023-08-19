import React from 'react';
import { Select, Space } from 'antd';

interface PartnerProps {
  setPartner: React.Dispatch<React.SetStateAction<number>>;
}
interface StarProps {
  setStar: React.Dispatch<React.SetStateAction<number>>;
}
interface SortProps {
  setSort: React.Dispatch<React.SetStateAction<number>>;
}

export function PartnerDropDown({ setPartner }: PartnerProps) {
  const handleChange = (value: string) => {
    setPartner(Number(value));
  };
  return (
    <Space wrap>
      <Select
        defaultValue="모집인원"
        style={{ width: 140 }}
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
        style={{ width: 140 }}
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
        defaultValue="인기순"
        style={{ width: 140 }}
        onChange={handleChange}
        options={[
          { value: '1', label: '인기순' },
          { value: '2', label: '최신순' },
        ]}
      />
    </Space>
  );
}

// 사용법

// const [star, setStar] = useState<number>(5);
// const [partner, setPartner] = useState<number>(1);
// const [sort, setSort] = useState<number>(1);

// <StarDropDown setStar={setStar} />
// <PartnerDropDown setPartner={setPartner} />
// <SortDropDown setSort={setSort} />
