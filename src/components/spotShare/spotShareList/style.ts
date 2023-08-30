import styled from 'styled-components';

export const MoveButtonArea = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
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
  /* padding: 24px; */
  /* padding-bottom: 15px; */
  position: relative;

  border-radius: 30px;
  box-shadow: 5px 5px 10px 3px rgba(0, 0, 0, 0.2);
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
  h1 {
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
  background-color: aliceblue;
  position: absolute;
  bottom: 110px;
  left: 20px;
`;
