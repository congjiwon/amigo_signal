import React, { useEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function PartnerCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);

  const getDateHandle = (dates: any, dateString: any) => {
    setSelectedDates(dateString);
  };

  useEffect(() => {
    console.log(selectedDates); // ['2023-08-14', '2023-08-16']
  });

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={getDateHandle} />
    </Space>
  );
}

export default PartnerCalendar;
