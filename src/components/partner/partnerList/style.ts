import styled from 'styled-components';

type StatusProps = {
  $isOpen: boolean;
};

export const CustomDropBox = styled.div`
  @media screen and (max-width: 690px) {
    position: relative;
    right: 76px;
    top: 4px;
  }
`;

export const NoDataImgBox = styled.div`
  height: 588px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 24px;
    color: var(--black, #121621);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
  }
`;

export const PartnerListLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;
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

  @media screen and (max-width: 1200px) {
    padding: 0 16px;
  }

  @media screen and (max-width: 690px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 0 20px;
    gap: 12px;

    & button:last-of-type {
      align-self: flex-end;
      z-index: 1;
      width: 87px;
      height: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: var(--white, #fff);
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        line-height: 100%; /* 14px */
        display: inline-block;
        width: 45px;
      }
    }
  }
`;

export const SelectsBox = styled.div`
  display: flex;

  @media screen and (max-width: 690px) {
    position: relative;
    top: -48px;
    flex-direction: column;
    align-items: flex-end;
    gap: 15px;
    width: 100%;
    margin-bottom: -60px;

    & > div {
      display: flex;
      gap: 12px;
    }

    & :where(.css-dev-only-do-not-override-byeoj0).ant-space-vertical {
      margin-left: 0 !important;
    }
  }
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
  height: 232px;
  position: relative;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    width: 335px;
    height: 216px;
  }
`;

export const LocationBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* position: absolute; */
  h1 {
    margin: 30px 0px 0px 5px;
  }

  /* @media screen and (max-width: 355px) {
    CheckBox {
      left: 320px;
    }
  } */
`;

export const FlagBox = styled.div`
  position: relative;
  width: 50px;
  height: 36px;
  /* border-radius: 50%; */
  border: 1px solid var(--light-gray, #e3e9f3);
  overflow: hidden;
  margin: 24px 0px 0px 20px;
`;

export const FlagImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Country = styled.p`
  color: var(--black, #000);
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
  margin-top: 23px;
`;

export const CheckBox = styled.div`
  border-radius: 18px;
  border: 1px solid var(--purple, #643bdc);
  width: 89px;
  height: 32px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 22px;
  right: 20px;
  span {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 160%; /* 19.2px */
    letter-spacing: -0.3px;
    margin-left: 5px;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37px;
  p {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
`;

export const TravelDate = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  p {
    margin-top: 3px;
  }
  img {
    margin-left: 20px;
    margin-bottom: 14px;
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
    background-color: #ede2ad;
    border-radius: 30px;
    font-size: 0.7rem;
  }
`;

export const Status = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: ${(props) => (props.$isOpen ? '#9cbdf7' : '#233f70')};
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
  width: 242px;
  height: 62px;
  margin-left: 20px;
  border-top: 1px solid #e3e9f3;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  font-size: 0.8rem;

  @media screen and (max-width: 600px) {
    width: 295px;
    height: 49px;
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  p {
    margin-left: 2px;
  }
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
