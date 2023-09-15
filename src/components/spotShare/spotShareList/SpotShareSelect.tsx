import { useNavigate } from 'react-router';
import { BtnStyleType } from '../../../types/styleTypes';
import Button from '../../common/button/Button';
import { FilterSpotCalendar } from '../../common/calendar/SpotCalendar';
import { SortDropDown } from '../../common/dropDown/DropDown';
import LocationDropDown from '../../common/dropDown/LocationDropDown';
import * as St from './style';

type SpotShareSelectProps = {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string[]>>;
  setSpotDate: React.Dispatch<React.SetStateAction<string[]>>;
};

const SpotShareSelect = ({ setSort, setLocation, setSpotDate }: SpotShareSelectProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <St.FilterBox>
        <St.SelectsBox>
          <St.CustomDropBox>
            <SortDropDown setSort={setSort} />
          </St.CustomDropBox>
          <div>
            <LocationDropDown setLocation={setLocation} />
            <FilterSpotCalendar setSpotDate={setSpotDate} />
          </div>
        </St.SelectsBox>
        <Button styleType={BtnStyleType.BTN_DARK} onClick={() => navigate('/spotshare/write')}>
          <span>글쓰기</span>
        </Button>
      </St.FilterBox>
    </div>
  );
};

export default SpotShareSelect;
