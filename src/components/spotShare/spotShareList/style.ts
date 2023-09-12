import { styled } from 'styled-components';

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

export const MoveButtonArea = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

export const SpotShareLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FilterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1200px) {
    padding: 0 16px;
  }
  @media screen and (max-width: 650px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
    gap: 12px;
    & button:last-of-type {
      align-self: flex-end;
    }
  }
`;

export const SelectsBox = styled.div`
  display: flex;
  gap: 24px;
  @media screen and (max-width: 650px) {
    align-items: flex-start;
    flex-direction: column;
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
  height: 282px;
  position: relative;
  border-radius: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

export const DateLikeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CalendarImage = styled.img`
  padding-left: 21px;
`;

export const LikeBox = styled.div`
  position: relative;
  bottom: 264px;
  right: -230px;
`;

export const LikeButton = styled.button`
  /* padding: 20px; */
  position: absolute;

  background-color: transparent;
  border: none;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease;
  }
  &:not(:hover) {
    transition: 0.3s ease-out;
  }
  cursor: pointer;
`;

export const Heart = {
  height: '24px',
  width: '24px',
  color: '#670FDF',
};

export const DefaultImg = styled.img`
  width: 282px;
  height: 143px;
  object-fit: cover;
  border-radius: 0px 0px 30px 30px;
`;

export const TravelDateBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 24px;
  gap: 5px;
  p {
    margin: 3px 0 21px 0;
    font-size: 12px;
  }
`;

export const TitleBox = styled.div`
  width: 200px;
  margin-bottom: 10px;
  p {
    padding-left: 20px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ContentBox = styled.div`
  p {
    width: 242px;
    font-size: 12px;
    height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 20px;
    margin-bottom: 17px;
  }
`;

export const CountryNameBox = styled.div`
  display: flex;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  background-color: aliceblue;
  span {
    padding: 6px 14px;
    border-radius: 18px;
    display: inline-block;
  }
`;

export const Span = styled.span`
  padding: 6px 14px;
  border-radius: 18px;
  display: inline-block;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 100px;
  left: 20px;
`;
