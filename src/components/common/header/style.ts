import { styled } from 'styled-components';

export const HeaderLayout = styled.div`
  border-bottom: 1px solid #efefef;
  height: fit-content;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 16px;
  width: 100%;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;

  & a {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    font-weight: 500;

    @media (max-width: 600px) {
      font-size: 14px;
      font-weight: 400;
    }
  }
  @media (max-width: 400px) {
    padding: 15px 16px;
  }
`;

export const H1 = styled.h1`
  & a {
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  @media (max-width: 400px) {
    & span {
      display: none;
    }
  }
`;

export const Gnb = styled.header`
  & ul {
    display: flex;
    gap: 16px;

    & a {
      color: #81858a;
      font-weight: 600;

      &:hover {
        color: #000;
      }

      &.active {
        color: #000;
      }
    }
  }
`;

export const Utils = styled.div`
  display: flex;
  gap: 8px;

  a {
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PopOverButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

export const MyPagePopover = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & a.active {
    font-weight: 500;
  }
`;
