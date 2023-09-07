import { Tables } from '../../../api/supabase/supabase';
import UserFeedback from '../userFeedback/UserFeedback';
import * as St from './style';

const PartnerDetailInfo = ({ partnerPostData }: { partnerPostData: Tables<'partnerPosts'> }) => {
  return (
    <>
      <St.Title>{partnerPostData?.title}</St.Title>
      {partnerPostData && <UserFeedback partnerPostData={partnerPostData} />}
      <St.DetailInfoList>
        <St.DetailInfoBox>
          <St.GrayParagraph>나라</St.GrayParagraph>
          <St.BlackParagraph>
            {partnerPostData?.region}
            &gt;
            {partnerPostData?.country.country!}
          </St.BlackParagraph>
        </St.DetailInfoBox>
        <St.DetailInfoBox>
          <St.GrayParagraph>모집인원</St.GrayParagraph>
          <St.BlackParagraph>{partnerPostData?.numOfPeople}명</St.BlackParagraph>
        </St.DetailInfoBox>
        <St.DetailInfoBox>
          <St.GrayParagraph>여행기간</St.GrayParagraph>
          <St.BlackParagraph>
            {partnerPostData?.startDate}
            &sim;
            {partnerPostData?.endDate}
          </St.BlackParagraph>
        </St.DetailInfoBox>
      </St.DetailInfoList>
      <St.DetailInfoList>
        {partnerPostData?.interestUrl.map((url, index) => (
          <St.DetailInfoTegBox key={index}>
            <St.TegImgBox>
              <St.TegImg src={url} alt={`interest-${index}`} />
            </St.TegImgBox>
            <St.BlackParagraph>{partnerPostData?.interestDiscription[index]}</St.BlackParagraph>
          </St.DetailInfoTegBox>
        ))}
      </St.DetailInfoList>
      <St.ContentParagraph>{partnerPostData?.content}</St.ContentParagraph>
    </>
  );
};

export default PartnerDetailInfo;
