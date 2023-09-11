import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const IntroLayout = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const IntroImgBox = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const IntroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -100px;
  left: 0;
`;

export const LogoDiv = styled.div`
  width: 200px;
  height: 200px;
`;

export const Logo = styled.p`
  font-size: 24px;
  font-weight: bold;

  margin: 18px 0 18px 0;
`;

export const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 32px;
`;

export const Span = styled.span`
  color: var(--white, #fff);
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

export const LinkIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin-bottom: 18px;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  .FiIcon {
    width: 36px;
    height: 36px;
  }
  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease;
    color: #643bdc;
  }
  &:not(:hover) {
    transition: 0.3s ease-out;
    color: white;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
  width: 250px;
  height: 120px;
  @media (max-width: 850px) {
    justify-content: center;
    gap: 35px;
  }
`;

export const LinkBox = styled(Link)`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const Paragraph = styled.p`
  text-align: center;
  color: var(--white, #fff);
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
