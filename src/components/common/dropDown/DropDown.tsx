import { Select, Space } from 'antd';
import React from 'react';

interface PartnerProps {
  setPartner: React.Dispatch<React.SetStateAction<number>>;
}
interface UpdatePartnerProps {
  partner: number;
  setPartner: React.Dispatch<React.SetStateAction<number>>;
}
interface StarProps {
  setStar: React.Dispatch<React.SetStateAction<number>>;
}
interface UpdateStarProps {
  star: number;
  setStar: React.Dispatch<React.SetStateAction<number>>;
}
interface SortProps {
  setSort: (value: string) => void;
}

interface RecruitmentProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
interface FilterPeriodProps {
  setFilterPeriod: React.Dispatch<React.SetStateAction<number>>;
}

export function SpotSharePeriodFilterDropDown({ setFilterPeriod }: FilterPeriodProps) {
  const handleChange = (value: string) => {
    setFilterPeriod(Number(value));
  };
  return (
    <Space wrap>
      <Select
        placeholder="월 별 필터링"
        style={{ width: '100%' }}
        onChange={handleChange}
        options={[{ label: '1월' }, { label: '2월' }, { label: '3월' }, { label: '4월' }, { label: '5월' }, { label: '6월' }, { label: '7월' }, { label: '8월' }, { label: '9월' }, { label: '10월' }, { label: '11월' }, { label: '12월' }]}
      />
    </Space>
  );
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

export function UpdatePartnerDropDown({ partner, setPartner }: UpdatePartnerProps) {
  const handleChange = (value: string) => {
    setPartner(Number(value));
  };
  const partnerString = partner.toString();
  return (
    <Space wrap>
      <Select
        placeholder="모집인원"
        defaultValue={partnerString}
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
        defaultValue="5"
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

export function UpdateStarDropDown({ star, setStar }: UpdateStarProps) {
  const handleChange = (value: string) => {
    setStar(Number(value));
  };
  const starString = star.toString();
  return (
    <Space wrap>
      <Select
        defaultValue={starString}
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
    setSort(value);
  };
  return (
    <Space wrap>
      <Select defaultValue="최신순" allowClear style={{ width: '90px', marginRight: '24px' }} onChange={handleChange} options={[{ value: '최신순' }, { value: '인기순' }]} />
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
        style={{ width: '90px', marginRight: '24px' }}
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
