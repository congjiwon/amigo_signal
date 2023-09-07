import { useNavigate } from 'react-router';
import { BtnStyleType } from '../../../types/styleTypes';
import Button from '../../common/button/Button';
import { FilterSpotCalendar } from '../../common/calendar/SpotCalendar';
import { SortDropDown } from '../../common/dropDown/DropDown';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import * as St from './style';

type SpotShareSelectProps = {
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
  setSpotDate: React.Dispatch<React.SetStateAction<string[]>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

const SpotShareSelect = ({ setLocation, setSpotDate, setSort }: SpotShareSelectProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <St.filterBox>
        <St.SelectsBox>
          <SortDropDown setSort={setSort} />
          <LocationDropDown setLocation={setLocation} />
          <FilterSpotCalendar setSpotDate={setSpotDate} />
        </St.SelectsBox>
        <Button styleType={BtnStyleType.BTN_DARK} onClick={() => navigate('/spotshare/write')}>
          글쓰기
        </Button>
      </St.filterBox>
    </div>
  );
};

export default SpotShareSelect;
