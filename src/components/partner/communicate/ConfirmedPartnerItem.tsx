import { Tables } from '../../../api/supabase/supabase';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import * as St from './style';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';

type ConfirmedPartnerItemProps = {
  data: Tables<'applicants'>;
};

const ConfirmedPartnerItem = ({ data }: ConfirmedPartnerItemProps) => {
  return (
    <St.ConfirmedApplicantItem>
      <St.ConfirmedApplicantInfo>
        <p>{data.users?.profileImageUrl ? <St.ApplicantProfileImage src={data.users?.profileImageUrl} alt="profile" /> : <St.ApplicantProfileImage src={defaultProfileImage} alt="profile" />}</p>
        <p>{data.users?.nickName}</p>
      </St.ConfirmedApplicantInfo>
      <St.ConfirmedApplicantAgeNGender>
        {classifyingAge(data.users?.birthday!)} | {data.users?.gender}
      </St.ConfirmedApplicantAgeNGender>
    </St.ConfirmedApplicantItem>
  );
};

export default ConfirmedPartnerItem;
