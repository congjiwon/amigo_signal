import { styled } from 'styled-components';

type StatusProps = {
  partnerStatus: string;
};

export const PartnerDetailMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommunicateDiv = styled.section`
  margin-top: 30px;
`;

export const Status = styled.div`
  display: flex;
  gap: 5px;
`;

export const PostStatus = styled.span<StatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  padding: 5px;
  background-color: ${(props) => (props.partnerStatus === '모집중' ? '#FF7000' : '#994504')};
  border-radius: 30px;
  font-size: 0.8rem;
  color: ${(props) => (props.partnerStatus === '모집중' ? '#000000' : '#ffffff')};
`;

export const ApplyStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  padding: 5px;
  background-color: #ffb67c;
  border-radius: 30px;
  font-size: 0.8rem;
`;
