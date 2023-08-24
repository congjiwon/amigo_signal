import { Tables } from '../../../api/supabase/supabase';
import * as St from './style';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';

type ApplicantCardProps = {
  data: Tables<'applicants'>;
};

const ApplicantCard = ({ data }: ApplicantCardProps) => {
  const getAgeCategory = (birthday: string) => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear() - (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) ? 1 : 0);

    if (age >= 20 && age < 30) {
      return '20대';
    }
    if (age >= 30 && age < 40) {
      return '30대';
    }
    if (age >= 40 && age < 50) {
      return '40대';
    }
    if (age >= 50 && age < 60) {
      return '50대';
    }
    if (age >= 60 && age < 70) {
      return '60대';
    }
    if (age >= 70 && age < 80) {
      return '70대';
    }
  };

  return (
    <St.ApplicantCard>
      <St.ApplicantProfile>
        <St.ApplicantInfo>
          {data.users?.profileImageUrl ? <St.ApplicantProfileImage src={data.users?.profileImageUrl} alt="profile" /> : <St.ApplicantProfileImage src={defaultProfileImage} alt="profile" />}
          <St.ApplicantNickName>{data.users?.nickName}</St.ApplicantNickName>
          <St.ApplicantAgeGender>
            {getAgeCategory(data.users?.birthday!)} | {data.users?.gender}
          </St.ApplicantAgeGender>
        </St.ApplicantInfo>
        <St.ButtonDiv>
          <St.CheckButton>수락</St.CheckButton>
          <St.CheckButton>거절</St.CheckButton>
        </St.ButtonDiv>
      </St.ApplicantProfile>
      <St.ApplicantContent>{data.content}</St.ApplicantContent>
    </St.ApplicantCard>
  );
};

export default ApplicantCard;
