import { Tables } from '../../../api/supabase/supabase';
import Modal from '../../common/modal/Modal';
import { useModalStore } from '../../../zustand/store';
import ApplicantList from './ApplicantList';
import ApplyWithInfo from './ApplyWithInfo';
import UserFeedback from '../userFeedback/UserFeedback';
import * as St from './style';

const PartnerDetailInfo = ({ partnerPostData }: { partnerPostData: Tables<'partnerPosts'> }) => {
  const { createdAt, writerId, openChat } = partnerPostData;
  const { openedModals, openModal } = useModalStore();

  return (
    <section>
      <St.H2>{partnerPostData.title}</St.H2>
      <UserFeedback createdAt={createdAt} writerId={writerId as string} openChat={openChat} />
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
        {partnerPostData.interestUrl.map((url, index) => (
          <St.DetailInfoBox key={index}>
            <St.InterestImage src={url} alt={`interest-${index}`} />
          </St.DetailInfoBox>
        ))}
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
