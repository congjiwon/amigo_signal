import { styled } from 'styled-components';

type StatusProps = {
  $partnerStatus: string;
};

type ApplyStatusProps = {
  $applicantStatus: '참여 신청중' | '참여 수락됨' | '참여 거절됨';
};

export const PartnerDetailMain = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 100px 0px 0px 0px;

  @media (max-width: 1256px) {
    display: block;
    padding: 0 50px 0 50px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    gap: 100px;
    padding: 0 20px 0 20px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    gap: 100px;
    padding: 0 10px 0 10px;
  }
`;

export const PartnerDetailInfoSection = styled.section`
  flex-basis: 791px;
  flex-shrink: 1;
`;

export const CommunicateDiv = styled.section``;

export const Status = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 160px;
  margin-bottom: 24px;
  @media (max-width: 1256px) {
    padding: 0 50px 0 50px;
  }
  @media (max-width: 800px) {
    padding: 0 20px 0 20px;
  }
  @media (max-width: 500px) {
    padding: 0 10px 0 10px;
  }
`;

export const PostStatus = styled.span<StatusProps>`
  display: inline-flex;
  padding: 7px 14px;
  align-items: center;
  gap: ${(props) => (props.$partnerStatus === '모집중' ? '8px' : '6px')};
  border: ${(props) => (props.$partnerStatus === '모집중' ? '1px solid #6C7486' : '1px solid #643BDC')};
  border-radius: 18px;
  color: ${(props) => (props.$partnerStatus === '모집중' ? '#6C7486' : '#643BDC')};
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 12px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.3px;
`;

export const ApplyStatus = styled.div<ApplyStatusProps>`
  display: inline-flex;
  padding: 7px 14px;
  align-items: center;
  gap: 8px;
  border-radius: 18px;
  background: ${(props) => (props.$applicantStatus === '참여 신청중' ? '#E3E9F3' : props.$applicantStatus === '참여 수락됨' ? '#15C69C' : '#D04863')};
  color: ${(props) => (props.$applicantStatus === '참여 신청중' ? '#121621' : '#FFF')};
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 12px;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: -0.3px;
`;
