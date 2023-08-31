import { styled } from 'styled-components';

export const MyPageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr) 282px;
  align-items: flex-start;
  gap: 24px;
  padding: 60px 32px;
  background-color: #fff;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 30px 20px;
  }
`;

export const MyPageTabPanelBox = styled.div`
  grid-column: 1 / 7;

  @media screen and (max-width: 768px) {
    grid-column: 1;
  }
`;

export const MyPageTabPanel = styled.div`
  display: none;

  &.active {
    display: block;
  }
`;

export const MyPageTabPanelTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  font-size: 24px;
  font-weight: 700;

  & img {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
`;

export const MyPageLNBBox = styled.div`
  grid-column: 7 / 8;
  display: flex;
  min-width: 282px;
  flex-direction: column;
  padding: 32px 16px 25px;
  box-sizing: border-box;
  border: 1px solid #e8ebee;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    position: relative;
    order: -1;
    grid-column: 1;
    padding: 0px;
    border: 0px;

    &::after {
      content: '';
      position: absolute;
      left: -20px;
      bottom: 0;
      width: 100vw;
      height: 10px;
      background-color: #efefef;
    }
  }
`;

export const MyPageTabs = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, minMax(100px, 1fr));
    margin-bottom: 47px;
  }
`;

export const MyPageTab = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
  padding: 7px 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: #adb1b8;
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

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 92px;
    margin-bottom: 0px;
    font-size: 12px;
  }
`;
