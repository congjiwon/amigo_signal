import styled from 'styled-components';

type StatusProps = {
  $isOpen: boolean;
};

export const PartnerListLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Country = styled.p`
  color: var(--black, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
  margin-top: 23px;
`;

//탑버튼
export const MoveButtonArea = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;
export const WriterInfoBox = styled.div`
  p {
    color: var(--dark-gray, #81858a);
  }
`;

export const FilterWriteBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, auto));
  grid-gap: 24px;
  place-items: center;
  margin: 50px auto;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, minmax(200px, auto));
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(200px, auto));
  }
`;

export const PostCard = styled.div`
  width: 282px;
  height: 282px;
  position: relative;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.1);
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h1 {
    margin: 30px 0px 0px 5px;
  }
`;

export const FlagBox = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 24px 0px 0px 20px;
`;

export const FlagImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  p {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
`;

export const TravelDate = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  p {
    margin-top: 3px;
  }
  img {
    margin-left: 20px;
  }
`;

export const TitleBox = styled.div`
  width: 200px;
  margin-bottom: 10px;
  p {
    font-weight: 600;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 20px;
  }
`;

export const Body = styled.div`
  display: flex;
  gap: 5px;
  margin: 21px 20px 20px 20px;
  /* margin-top: 21px; */
  /* margin-left: 20px; */
  /* margin-right: 20px; */
  padding-bottom: 19px;
  border-bottom: 1px solid #d9d9d9;
  p {
    padding: 7px;
    background-color: lightgray;
    border-radius: 30px;
    font-size: 0.7rem;
  }
`;

export const Status = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: ${(props) => (props.$isOpen ? '#FF7000' : '#994504')};
  border-radius: 30px;
  font-size: 0.7rem;
  color: ${(props) => (props.$isOpen ? '#000000' : '#ffffff')};
`;

export const InterestImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  align-items: center;
  font-size: 0.8rem;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-left: 20px;
  p {
    margin-left: 2px;
  }
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
