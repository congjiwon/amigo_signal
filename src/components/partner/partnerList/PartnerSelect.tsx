import React from 'react';
import { useNavigate } from 'react-router';
import { BtnStyleType } from '../../../types/styleTypes';
import Button from '../../common/button/Button';
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
    <St.FilterWriteBox>
      <St.SelectsBox>
        <RecruitmentDropDown setIsOpen={setIsOpen} />
        <LocationDropDown setLocation={setLocation} />
        <PartnerCalendar setPartnerDates={setDate} />
      </St.SelectsBox>
      <Button styleType={BtnStyleType.BTN_DARK} onClick={() => navigate('/partner/write')}>
        글쓰기
      </Button>
    </St.FilterWriteBox>
  );
};

export default PartnerSelect;
