import { FiCalendar, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import defaultImg from '../../../../assets/imgs/users/default_profile_img.png';
import classifyingAge from '../../../common/classifyingAge/classifyingAge';
import * as StCommon from '../style/style';

type PartnerItemProps = {
  partnerPost: {
    content: string;
    country: {
      country: string;
      countryId: string;
      flagUrl: string;
      imageUrl: string;
    };
    createdAt: string;
    endDate: string;
    id: string;
    interestUrl: string[];
    isOpen: boolean;
    numOfPeople: number;
    openChat: string;
    region: string;
    startDate: string;
    title: string;
    writerId:
      | string
      | null
      | {
          birthday: string;
          gender: string;
          nickName: string;
          profileImageUrl: string | null;
        };
    users?: {
      birthday: string;
      gender: string;
      nickName: string;
      profileImageUrl: string | null;
    };
  };
  postUserInfo?: boolean;
};

type WriterInfoType = {
  birthday?: string | null;
  gender?: string;
  nickName?: string;
  profileImageUrl?: string;
};

type CountryInfoType = {
  name: string | null;
  flagUrl: string | null;
};

export default function MyPartnerCard({ partnerPost, postUserInfo }: PartnerItemProps) {
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  const writerInfo: WriterInfoType = {
    birthday: '',
    gender: '',
    nickName: '',
    profileImageUrl: '',
  };
  if (postUserInfo && typeof partnerPost.writerId === 'object') {
    writerInfo.birthday = partnerPost.writerId?.birthday && classifyingAge(partnerPost.writerId?.birthday);
    writerInfo.gender = partnerPost.writerId?.gender;
    writerInfo.nickName = partnerPost.writerId?.nickName;
    writerInfo.profileImageUrl = partnerPost.writerId?.profileImageUrl ? `${storagaUrl}/${partnerPost.writerId.profileImageUrl}` : defaultImg;
  }

  const countryData: CountryInfoType = {
    name: '',
    flagUrl: '',
  };
  if (partnerPost && typeof partnerPost.country === 'object') {
    countryData.name = partnerPost.country.country;
    countryData.flagUrl = partnerPost.country.flagUrl;
  }
  return (
    <StCommon.MyCard>
      <Link to={`/partner/detail/${partnerPost.id}`}>
        <StCommon.PaddingBox>
          <StCommon.FlexBetween className="partner-top">
            <StCommon.CountryInfo>
              <div>
                <img src={`${countryData.flagUrl}`} alt={`${countryData.name} 국기`} />
              </div>
              <p>{partnerPost.country.country}</p>
            </StCommon.CountryInfo>
            {!partnerPost.isOpen && (
              <StCommon.OpenStatus>
                <FiCheck />
                모집완료
              </StCommon.OpenStatus>
            )}
          </StCommon.FlexBetween>

          <StCommon.DateInfo>
            <FiCalendar />
            {partnerPost.startDate}~{partnerPost.endDate}
          </StCommon.DateInfo>

          <StCommon.CardTitle className="partner-title">{partnerPost.title}</StCommon.CardTitle>

          {postUserInfo && (
            <StCommon.FlexBetween className="partner-bottom">
              <StCommon.UserInfoMain>
                <div>
                  <img src={writerInfo.profileImageUrl} alt={`${writerInfo.nickName}님 프로필 이미지`} />
                </div>
                <p>{writerInfo.nickName}</p>
              </StCommon.UserInfoMain>
              <StCommon.UserInfoSub>
                {writerInfo.gender} | {writerInfo.birthday}
              </StCommon.UserInfoSub>
            </StCommon.FlexBetween>
          )}
        </StCommon.PaddingBox>
      </Link>
    </StCommon.MyCard>
  );
}
