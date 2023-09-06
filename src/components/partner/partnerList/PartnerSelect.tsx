import React from 'react';
import { useNavigate } from 'react-router';
import PartnerCalendar from '../../common/calendar/PartnerCalendar';
import { RecruitmentDropDown } from '../../common/dropDown/DropDown';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import * as St from './style';

type PartnerSelectProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
  setDate: React.Dispatch<React.SetStateAction<string[]>>;
};

const PartnerSelect = ({ setIsOpen, setLocation, setDate }: PartnerSelectProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <St.FilterWriteBox>
        <div>
          <RecruitmentDropDown setIsOpen={setIsOpen} />
          <LocationDropDown setLocation={setLocation} />
          <PartnerCalendar setPartnerDates={setDate} />
        </div>
        <button onClick={() => navigate('/partner/write')}>글쓰기</button>
      </St.FilterWriteBox>
    </div>
  );
};

export default PartnerSelect;
