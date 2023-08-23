import { Tables } from '../../../api/supabase/supabase';
import Modal from '../../common/modal/Modal';
import { useModalStore } from '../../zustand/store';
import ApplicantList from './ApplicantList';
import ApplyWithInfo from './ApplyWithInfo';
import * as St from './style';

const PartnerDetailInfo = ({ partnerPostData }: { partnerPostData: Tables<'partnerPosts'> }) => {
  const { openedModals, openModal } = useModalStore();

  return (
    <section>
      <St.H2>{partnerPostData.title}</St.H2>
      <St.UserFeedbackBox>
        <St.UserProfileBox>
          <St.UserProfileImgBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
            </svg>
          </St.UserProfileImgBox>
          <div>
            <St.BlackParagraph>유저아이디</St.BlackParagraph>
            <St.GrayParagraph>2023.08.31 조회 100</St.GrayParagraph>
          </div>
        </St.UserProfileBox>
        <div>버튼</div>
      </St.UserFeedbackBox>
      <St.DetailInfoList>
        <St.DetailInfoBox>
          <St.GrayParagraph>나라</St.GrayParagraph>
          <St.BlackParagraph>
            {partnerPostData.region}
            &gt;
            {partnerPostData.country}
          </St.BlackParagraph>
        </St.DetailInfoBox>
        <St.DetailInfoBox>
          <St.GrayParagraph>모집인원</St.GrayParagraph>
          <St.BlackParagraph>{partnerPostData.numOfPeople}명</St.BlackParagraph>
        </St.DetailInfoBox>
        <St.DetailInfoBox>
          <St.GrayParagraph>여행기간</St.GrayParagraph>
          <St.BlackParagraph>
            {partnerPostData.startDate}
            &sim;
            {partnerPostData.endDate}
          </St.BlackParagraph>
        </St.DetailInfoBox>
        <St.DetailInfoBox>
          <St.BlackParagraph>같이 카페가요!</St.BlackParagraph>
        </St.DetailInfoBox>
        <St.DetailInfoBox>
          <St.BlackParagraph>같이 카페가요!</St.BlackParagraph>
        </St.DetailInfoBox>
        <St.DetailInfoBox>
          <St.BlackParagraph>같이 카페가요!</St.BlackParagraph>
        </St.DetailInfoBox>
      </St.DetailInfoList>
      <St.ContentParagraph>{partnerPostData.content}</St.ContentParagraph>
      <button onClick={() => openModal('applyWithInfo')}>참여하기</button>
      {openedModals.applyWithInfo && (
        <Modal id="applyWithInfo" size="medium">
          <ApplyWithInfo />
        </Modal>
      )}
      <button onClick={() => openModal('applicantList')}>신청자 목록</button>
      {openedModals.applicantList && (
        <Modal id="applicantList" size="large">
          <ApplicantList />
        </Modal>
      )}
    </section>
  );
};

export default PartnerDetailInfo;
