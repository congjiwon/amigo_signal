import { ConfigProvider, DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import koKR from 'antd/es/locale/ko_KR';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getDateHandle = (dates: any, dateString: any) => {
    setPartnerDates(dateString);
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <>
      <GlobalStyle />
      <ConfigProvider locale={koKR}>
        <Space direction="vertical" size={12} style={{ marginLeft: '24px' }}>
          <RangePicker className={isMobile ? 'mobile-range-picker' : ''} allowClear disabledDate={disabledDate} onChange={getDateHandle} inputReadOnly />
        </Space>
      </ConfigProvider>
    </>
  );
}

export default PartnerCalendar;

export function UpdatePartnerCalendar({ startDate, endDate, setPartnerDates }: UpdateCalendarProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getDateHandle = (dates: any, dateString: any) => {
    setPartnerDates(dateString);
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };
  const dateFormat = 'YYYY/MM/DD';
  return (
    <>
      <GlobalStyle />
      <ConfigProvider locale={koKR}>
        <Space direction="vertical" size={12}>
          <RangePicker className={isMobile ? 'mobile-range-picker' : ''} allowClear defaultValue={[dayjs(startDate, dateFormat), dayjs(endDate, dateFormat)]} disabledDate={disabledDate} onChange={getDateHandle} inputReadOnly />
        </Space>
      </ConfigProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  @media (max-width: 768px) {
    .ant-picker-panels {
      display: flex;
      flex-direction: column;
    }
  }
`;
