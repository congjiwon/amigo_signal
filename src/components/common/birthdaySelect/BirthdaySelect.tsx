import React, { useEffect, useState } from 'react';
import { Select, Row, Col } from 'antd';
import useBirthdayStore from '../../../zustand/birthdayData';

const { Option } = Select;

const BirthdaySelect: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);

  const setBirthday = useBirthdayStore((state) => state.setBirthday);

  useEffect(() => {
    const formattedMonth = selectedMonth && selectedMonth.toString().padStart(2, '0');
    const formattedDay = selectedDay && selectedDay.toString().padStart(2, '0');
    const birthdayString = selectedYear && formattedMonth && formattedDay && `${selectedYear}-${formattedMonth}-${formattedDay}`;

    birthdayString && setBirthday(birthdayString);
  }, [selectedDay, selectedMonth, selectedYear]);

  const yearsRange = () => {
    const currentYear = new Date().getFullYear() - 19;
    const startYear = currentYear - 100;
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);
  };

  const months = [
    { value: 1, label: '1월' },
    { value: 2, label: '2월' },
    { value: 3, label: '3월' },
    { value: 4, label: '4월' },
    { value: 5, label: '5월' },
    { value: 6, label: '6월' },
    { value: 7, label: '7월' },
    { value: 8, label: '8월' },
    { value: 9, label: '9월' },
    { value: 10, label: '10월' },
    { value: 11, label: '11월' },
    { value: 12, label: '12월' },
  ];

  const maxDaysInMonth = (month: number, year: number) => {
    if (month === 2) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    } else {
      return 31;
    }
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Select placeholder="연도" style={{ width: '100%' }} onChange={(value: number) => setSelectedYear(value)}>
          {yearsRange().map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={8}>
        <Select placeholder="월" style={{ width: '100%' }} onChange={(value: number) => setSelectedMonth(value)}>
          {selectedYear &&
            months.map((month) => (
              <Option key={month.value} value={month.value}>
                {month.label}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={8}>
        <Select placeholder="일" style={{ width: '100%' }} onChange={(value: number) => setSelectedDay(value)}>
          {selectedMonth &&
            Array.from({ length: maxDaysInMonth(selectedMonth, selectedYear!) }, (_, index) => index + 1).map((day) => (
              <Option key={day} value={day}>
                {`${day}일`}
              </Option>
            ))}
        </Select>
      </Col>
    </Row>
  );
};

export default BirthdaySelect;
