import { styled } from 'styled-components';

export const HeaderLayout = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 70px;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  z-index: 9;
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
    gap: 60px;

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

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  margin-left: 28px;
  border-radius: 50%;
`;

export const NickName = styled.p`
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
`;

export const PopOverButton = styled.button`
  margin-left: 10px;
  padding: 0;
  border: none;
  background: none;
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
