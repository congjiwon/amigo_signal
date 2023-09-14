import { Cascader } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllLocation } from '../../../api/supabase/location';

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
}
interface UpdateProps {
  location: string[];
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
}

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

function LocationDropDown({ setLocation }: Props) {
  const [options, setOptions] = useState<Option[]>([]); // options 상태로 변경
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLocation();
      if (data?.data) {
        const newOptions: Option[] = data.data.map((regionData) => ({
          value: regionData.region,
          label: regionData.region,
          children: regionData.country?.map((country) => ({
            value: country,
            label: country,
          })),
        }));
        setOptions(newOptions);
      }
    };
    fetchData();
  }, []);
  const onChange = (value: string[]) => {
    const valueSplit = value[0]?.split(','); // value[0]가 정의되어 있을 경우에만 처리
    if (valueSplit) {
      setLocation(valueSplit);
    }
  };

  return <Cascader className="LocationDropDown" options={options} onChange={(e) => onChange([String(e)])} placeholder="국가 선택" />;
}

export default LocationDropDown;

export function UpdateLocationDropDown({ location, setLocation }: UpdateProps) {
  const [options, setOptions] = useState<Option[]>([]); // options 상태로 변경
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLocation();
      if (data?.data) {
        const newOptions: Option[] = data.data.map((regionData) => ({
          value: regionData.region,
          label: regionData.region,
          children: regionData.country?.map((country) => ({
            value: country,
            label: country,
          })),
        }));
        setOptions(newOptions);
      }
    };
    fetchData();
  }, []);
  const onChange = (value: string[]) => {
    const valueSplit = value[0]?.split(','); // value[0]가 정의되어 있을 경우에만 처리
    if (valueSplit) {
      setLocation(valueSplit);
    }
  };

  return (
    <Cascader
      className="UpdateLocationDropDown"
      // style={{ width: 140 }}
      options={options}
      onChange={(e) => onChange([String(e)])}
      placeholder="국가 선택"
      defaultValue={location}
    />
  );
}
