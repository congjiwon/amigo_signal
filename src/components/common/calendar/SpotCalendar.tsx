import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface CalendarProps {
  setSpotDate: React.Dispatch<React.SetStateAction<string>>;
}
interface UpdateCalendarProps {
  spotDate: string;
  setSpotDate: React.Dispatch<React.SetStateAction<string>>;
}

function SpotCalendar({ setSpotDate }: CalendarProps) {
  const getDateHandle: DatePickerProps['onChange'] = (date, dateString) => {
    setSpotDate(dateString);
  };

  return (
    <Space direction="vertical">
      <DatePicker onChange={getDateHandle} />
    </Space>
  );
}

export default SpotCalendar;

export function UpdateSpotCalendar({ spotDate, setSpotDate }: UpdateCalendarProps) {
  const getDateHandle: DatePickerProps['onChange'] = (date, dateString) => {
    setSpotDate(dateString);
  };
  const dateFormat = 'YYYY/MM/DD';
  return (
    <Space direction="vertical">
      <DatePicker defaultValue={dayjs(spotDate, dateFormat)} onChange={getDateHandle} />
    </Space>
  );
}
