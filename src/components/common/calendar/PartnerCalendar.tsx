import React from 'react';
import { DatePicker, Space } from 'antd';

interface CalendarProps {
  setPartnerDates: React.Dispatch<React.SetStateAction<string[]>>;
}

const { RangePicker } = DatePicker;

function PartnerCalendar({ setPartnerDates }: CalendarProps) {
  const getDateHandle = (dates: any, dateString: any) => {
    // console.log('dateString:', dateString, 'dates:', dates);
    setPartnerDates(dateString);
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker onChange={getDateHandle} />
    </Space>
  );
}

export default PartnerCalendar;
// function PartnerCalendar() {
//   const [selectedDates, setSelectedDates] = useState([]);

//   const getDateHandle = (dates: any, dateString: any) => {
//     setSelectedDates(dateString);
//   };

//   useEffect(() => {
//     console.log(selectedDates); // ['2023-08-14', '2023-08-16']
//   }, [selectedDates]);

//   return (
//     <Space direction="vertical" size={12}>
//       <RangePicker onChange={getDateHandle} />
//     </Space>
//   );
// }

// export default PartnerCalendar;
