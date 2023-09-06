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
  // const { data: flagData, isLoading, isError } = useQuery(['flags', partnerPost.id], () => getFlag(partnerPost.country));

  // const flagUrl = flagData?.data?.map((item) => item.flagUrl)[0];

  return (
    <StCommon.MyCard>
      <Link to={`/partner/detail/${partnerPost.id}`}>
        <StCommon.PaddingBox>
          <StCommon.FlexBetween className="partner-top">
            <StCommon.CountryInfo>
              <div>
                <img src="" alt={`${partnerPost.country} 국기`} />
              </div>
              <p>{partnerPost.country.country}</p>
            </StCommon.CountryInfo>
            <StCommon.OpenStatus>{partnerPost.isOpen ? `모집중` : `모집완료`}</StCommon.OpenStatus>
          </StCommon.FlexBetween>

          <StCommon.DateInfo>
            {partnerPost.startDate} ~ {partnerPost.endDate}
          </StCommon.DateInfo>

          <StCommon.CardTitle className="partner-title">{partnerPost.title}</StCommon.CardTitle>

          <StCommon.FlexBetween>
            <StCommon.InterestList>
              {partnerPost.interestUrl.map((url, i) => (
                <li key={i}>
                  <img src={url} />
                </li>
              ))}
            </StCommon.InterestList>
            <StCommon.numOfPeople>
              모집인원 <span>{partnerPost.numOfPeople}</span>
            </StCommon.numOfPeople>
          </StCommon.FlexBetween>

          {postUserInfo && (
            <StCommon.FlexBetween className="partner-bottom">
              <StCommon.UserInfoMain>
                <div>
                  <img src={writerInfo.profileImageUrl} />
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
