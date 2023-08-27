import { styled } from 'styled-components';

export const MyContentsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minMax(0px, 1fr));
  gap: 40px;
  padding: 60px 32px;
  background-color: #fff;
`;

export const MyContentsLeftBox = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  box-sizing: border-box;
  border: 1px solid #e8ebee;
  border-radius: 10px;
`;

export const MyContentsTab = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
  padding: 7px;
  color: #adb1b8;
  font-weight: 700;
  background-color: #fff;
  border: 0;
  border-radius: 10px;
  cursor: pointer;

  &.active {
    background-color: #e8ebee;
    color: #000;
  }

  & img {
    width: 40px;
  }
`;

export const MyContentsRightBox = styled.div`
  grid-column: 2 / 5;
`;

export const MyContentTabPanel = styled.div`
  display: none;

  &.active {
    display: block;
  }
`;
