import { useState } from 'react';
import SpotShareItems from './SpotShareItems';
import SpotShareSelect from './SpotShareSelect';
import * as St from './style';

const SpotShareList = () => {
  const [sort, setSort] = useState<string>('createdAt');
  const [location, setLocation] = useState<string[]>([]);
  const [spotDate, setSpotDate] = useState<string[]>([]);

  const country = location[1];
  const startDate = spotDate[0] === '' ? undefined : spotDate[0];
  const endDate = spotDate[1] === '' ? undefined : spotDate[1];

  return (
    <St.SpotShareLayout>
      <SpotShareSelect setSort={setSort} setLocation={setLocation} setSpotDate={setSpotDate} />
      <SpotShareItems sort={sort} country={country} startDate={startDate} endDate={endDate} />
    </St.SpotShareLayout>
  );
};

export default SpotShareList;
