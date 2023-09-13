import { LogoDiv } from './../Intro/style';
import { currentTime } from './../currentTime/CurrentTime';
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

  @media screen and (max-width: 640px) {
    display: none;
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

  @media screen and (max-width: 640px) {
    display: none;
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

// Mobile
export const MobileMenu = styled.div`
  display: none;

  & .hambuger-menu {
    width: 24px;
    height: 24px;
    margin-left: 14px;
  }

  @media screen and (max-width: 640px) {
    display: block;
  }
`;

export const DrawerHeader = styled.div`
  position: relative;
  padding: 54px 20px 24px 20px;
  border-bottom: 1px solid #e3e9f3;

  & .icon-close-menu {
    position: absolute;
    width: 25px;
    height: 25px;
    bottom: 30.5px;
    right: 22.5px;
    cursor: pointer;
  }
`;

export const UserBoxM = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const LoginBoxM = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 41px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
  }

  & .link-login {
    color: #fff;
    background-color: #121621;
    border: 1px solid #121621;
  }

  & .link-join {
    color: #121621;
    background-color: #fff;
    border: 1px solid #e3e9f3;
  }
`;

export const ProfileImgM = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const NickNameM = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export const DrawerBody = styled.div`
  padding: 32px 20px;
`;

export const GnbM = styled.div`
  li {
    margin-bottom: 32px;
    color: #000;
    font-size: 20px;
    font-weight: 600;

    a:hover,
    a:active,
    a.active {
      color: #643bdc;
    }
  }
`;

export const UserMenuM = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 41px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
  }

  & .btn-mypage {
    color: #fff;
    background-color: #643bdc;
  }

  & .btn-logout {
    border: 1px solid #e3e9f3;
  }
`;
