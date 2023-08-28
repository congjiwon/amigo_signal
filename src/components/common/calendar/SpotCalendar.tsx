import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

interface CalendarProps {
  setSpotDate: React.Dispatch<React.SetStateAction<string>>;
}

function SpotCalendar({ setSpotDate }: CalendarProps) {
  const getDateHandle: DatePickerProps['onChange'] = (date, dateString) => {
    //dataString => '2023-08-14' 이런식으로 찍힘
    console.log(date, dateString);
    setSpotDate(dateString);
  };

  return (
    <Space direction="vertical">
      <DatePicker onChange={getDateHandle} />
    </Space>
  );
}

export default SpotCalendar;
