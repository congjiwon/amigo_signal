import { Tables } from '../../../api/supabase/supabase';
import * as St from './style';

const PartnerDetailInfo = ({ partnerPostData }: { partnerPostData: Tables<'partnerPosts'> }) => {
  return (
    <section>
      <St.H2>{partnerPostData.title}</St.H2>
      <St.userFeedbackBox>
        <St.userProfileBox>
          <St.userProfileImgBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
            </svg>
          </St.userProfileImgBox>
          <div>
            <St.blackParagraph>유저아이디</St.blackParagraph>
            <St.grayParagraph>2023.08.31 조회 100</St.grayParagraph>
          </div>
        </St.userProfileBox>
        <div>버튼</div>
      </St.userFeedbackBox>
      <St.detailInfoList>
        <St.detailInfoBox>
          <St.grayParagraph>나라</St.grayParagraph>
          <St.blackParagraph>
            {partnerPostData.region}
            &gt;
            {partnerPostData.country}
          </St.blackParagraph>
        </St.detailInfoBox>
        <St.detailInfoBox>
          <St.grayParagraph>모집인원</St.grayParagraph>
          <St.blackParagraph>{partnerPostData.numOfPeople}명</St.blackParagraph>
        </St.detailInfoBox>
        <St.detailInfoBox>
          <St.grayParagraph>여행기간</St.grayParagraph>
          <St.blackParagraph>
            {partnerPostData.startDate}
            &sim;
            {partnerPostData.endDate}
          </St.blackParagraph>
        </St.detailInfoBox>
        <St.detailInfoBox>
          <St.blackParagraph>같이 카페가요!</St.blackParagraph>
        </St.detailInfoBox>
        <St.detailInfoBox>
          <St.blackParagraph>같이 카페가요!</St.blackParagraph>
        </St.detailInfoBox>
        <St.detailInfoBox>
          <St.blackParagraph>같이 카페가요!</St.blackParagraph>
        </St.detailInfoBox>
      </St.detailInfoList>
      <St.contentParagraph>{partnerPostData.content}</St.contentParagraph>
    </section>
  );
};

export default PartnerDetailInfo;
