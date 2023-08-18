import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function SpotCalendar() {
  const getDateHandle: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString); //dataString => '2023-08-14' 이런식으로 찍힘
  };

  return (
    <Space direction="vertical">
      <DatePicker onChange={getDateHandle} />
    </Space>
  );
}

export default SpotCalendar;
