import React, { useState } from 'react';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { ConfigProvider, DatePicker, Select, Space, TimePicker } from 'antd';
import koKR from 'antd/es/locale/ko_KR';

const { Option } = Select;

type PickerType = 'time' | 'date';

const PickerWithType = ({ type, onChange }: { type: PickerType; onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'] }) => {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

const SpotDateFilter: React.FC = () => {
  const [type, setType] = useState<PickerType>('date');

  return (
    <ConfigProvider locale={koKR}>
      <Space>
        <Select value={type} onChange={setType}>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
        <PickerWithType type={type} onChange={(value) => console.log(value)} />
      </Space>
    </ConfigProvider>
  );
};

export default SpotDateFilter;
