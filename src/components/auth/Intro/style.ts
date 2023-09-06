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
  justify-content: center; /* 가운데 정렬을 위해 추가 */
  position: absolute;
  top: -100px; /* 이미지 위에 오버레이되도록 */
  left: 0; /* 이미지 위에 오버레이되도록 */
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

  margin-bottom: 30px;
`;

export const Span = styled.span`
  color: var(--white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

export const LinkIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-bottom: 18px;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 80px;
  width: 250px;
  height: 120px;
`;

export const LinkBox = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  p {
    color: var(--white, #fff);
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
