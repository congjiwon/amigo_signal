import type { DatePickerProps } from 'antd';
import { ConfigProvider, DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import koKR from 'antd/es/locale/ko_KR';
import dayjs from 'dayjs';

interface CalendarProps {
  setSpotDate: React.Dispatch<React.SetStateAction<string>>;
}
interface UpdateCalendarProps {
  spotDate: string;
  setSpotDate: React.Dispatch<React.SetStateAction<string>>;
}
interface FilterCalendarProps {
  setSpotDate: React.Dispatch<React.SetStateAction<string[]>>;
}

const { RangePicker } = DatePicker;

export function SpotCalendar({ setSpotDate }: CalendarProps) {
  const getDateHandle: DatePickerProps['onChange'] = (date, dateString) => {
    setSpotDate(dateString);
  };

  return (
    <Space direction="vertical">
      <DatePicker onChange={getDateHandle} inputReadOnly />
    </Space>
  );
}

export function UpdateSpotCalendar({ spotDate, setSpotDate }: UpdateCalendarProps) {
  const getDateHandle: DatePickerProps['onChange'] = (date, dateString) => {
    setSpotDate(dateString);
  };
  const dateFormat = 'YYYY/MM/DD';
  return (
    <Space direction="vertical">
      <DatePicker defaultValue={dayjs(spotDate, dateFormat)} onChange={getDateHandle} inputReadOnly />
    </Space>
  );
}

export function FilterSpotCalendar({ setSpotDate }: FilterCalendarProps) {
  const getDateHandle = (dates: any, dateString: any) => {
    setSpotDate(dateString);
  };
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().startOf('day');
  };

  return (
    <ConfigProvider locale={koKR}>
      <Space direction="vertical" size={12} style={{ marginLeft: '24px' }}>
        <RangePicker allowClear disabledDate={disabledDate} onChange={getDateHandle} inputReadOnly />
      </Space>
    </ConfigProvider>
  );
}
