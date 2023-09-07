import { useState } from 'react';
import * as St from '../partner/partnerList/style';
import PartnerItems from './partnerList/PartnerItems';
import PartnerSelect from './partnerList/PartnerSelect';

const PartnerList = () => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const [location, setLocation] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);

  const country = location[1];
  const startDate = date[0] === '' ? undefined : date[0];
  const endDate = date[1] === '' ? undefined : date[1];

  return (
    <>
      <St.PartnerListLayout>
        <PartnerSelect setIsOpen={setIsOpen} setLocation={setLocation} setDate={setDate} />
        <PartnerItems isOpen={isOpen} country={country} startDate={startDate} endDate={endDate} />
      </St.PartnerListLayout>
    </>
  );
};

export default PartnerList;
