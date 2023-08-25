import { styled } from 'styled-components';

type StatusProps = {
  isOpen: boolean;
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
  width: 2.5rem;
  padding: 5px;
  background-color: ${(props) => (props.isOpen ? '#FF7000' : '#994504')};
  border-radius: 30px;
  font-size: 0.7rem;
  color: ${(props) => (props.isOpen ? '#000000' : '#ffffff')};
`;

export const ApplyStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  padding: 5px;
  background-color: #ffb67c;
  border-radius: 30px;
  font-size: 0.7rem;
`;
