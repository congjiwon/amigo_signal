import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Space, ConfigProvider } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import koKR from 'antd/es/locale/ko_KR';

interface CalendarProps {
  setPartnerDates: React.Dispatch<React.SetStateAction<string[]>>;
}

const { RangePicker } = DatePicker;

function PartnerCalendar({ setPartnerDates }: CalendarProps) {
  const getDateHandle = (dates: any, dateString: any) => {
    // console.log('dateString:', dateString, 'dates:', dates);
    setPartnerDates(dateString);
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <ConfigProvider locale={koKR}>
      <Space direction="vertical" size={12}>
        <RangePicker disabledDate={disabledDate} onChange={getDateHandle} />
      </Space>
    </ConfigProvider>
  );
}

export default PartnerCalendar;
