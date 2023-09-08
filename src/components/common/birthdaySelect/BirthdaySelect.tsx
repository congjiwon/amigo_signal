import { Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
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
    console.log('useEffect', birthdayString);
  }, [selectedDay, selectedMonth, selectedYear]);

  const yearsRange = () => {
    const currentYear = new Date().getFullYear() - 19;
    const startYear = currentYear - 100;
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);
  };

  const months = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }];

  const maxDaysInMonth = (month: number, year: number) => {
    if (month === 2) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    } else {
      return 31;
    }
  };

  type CheckLastDayInYearMonthProps = {
    selectName: 'year' | 'month';
    value: number;
  };
  const checkLastDayInYearMonth = ({ selectName, value }: CheckLastDayInYearMonthProps) => {
    switch (selectName) {
      case 'year': {
        if (selectedMonth && selectedDay) {
          const newDayMax = maxDaysInMonth(selectedMonth!, value!);
          newDayMax < selectedDay && setSelectedDay(newDayMax);
        }
        break;
      }
      case 'month': {
        if (selectedDay) {
          const newDayMax = maxDaysInMonth(value!, selectedYear!);
          newDayMax < selectedDay && setSelectedDay(newDayMax);
        }
      }
    }
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Select
          placeholder="연도"
          style={{ width: '100%' }}
          onChange={(value: number) => {
            setSelectedYear(value);
            checkLastDayInYearMonth({ selectName: 'year', value });
          }}
        >
          {yearsRange().map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={8}>
        <Select
          placeholder="월"
          style={{ width: '100%' }}
          onChange={(value: number) => {
            setSelectedMonth(value);
            checkLastDayInYearMonth({ selectName: 'month', value });
          }}
        >
          {selectedYear &&
            months.map((month) => (
              <Option key={month.value} value={month.value}>
                {`${month.value}월`}
              </Option>
            ))}
        </Select>
      </Col>
      <Col span={8}>
        <Select placeholder="일" style={{ width: '100%' }} onChange={(value: number) => setSelectedDay(value)} value={selectedDay}>
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
