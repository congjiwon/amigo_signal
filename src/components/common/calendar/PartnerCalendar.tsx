import { ConfigProvider, DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import koKR from 'antd/es/locale/ko_KR';
import dayjs from 'dayjs';
import React from 'react';

interface CalendarProps {
  setPartnerDates: React.Dispatch<React.SetStateAction<string[]>>;
}
interface UpdateCalendarProps {
  startDate: string;
  endDate: string;
  setPartnerDates: React.Dispatch<React.SetStateAction<string[]>>;
}

const { RangePicker } = DatePicker;

function PartnerCalendar({ setPartnerDates }: CalendarProps) {
  const getDateHandle = (dates: any, dateString: any) => {
    setPartnerDates(dateString);
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <ConfigProvider locale={koKR}>
      <Space direction="vertical" size={12}>
        <RangePicker allowClear disabledDate={disabledDate} onChange={getDateHandle} />
      </Space>
    </ConfigProvider>
  );
}

export default PartnerCalendar;

export function UpdatePartnerCalendar({ startDate, endDate, setPartnerDates }: UpdateCalendarProps) {
  const getDateHandle = (dates: any, dateString: any) => {
    setPartnerDates(dateString);
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };
  const dateFormat = 'YYYY/MM/DD';
  return (
    <ConfigProvider locale={koKR}>
      <Space direction="vertical" size={12}>
        <RangePicker defaultValue={[dayjs(startDate, dateFormat), dayjs(endDate, dateFormat)]} disabledDate={disabledDate} onChange={getDateHandle} />
      </Space>
    </ConfigProvider>
  );
}
