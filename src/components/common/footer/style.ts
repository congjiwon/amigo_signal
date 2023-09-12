import { styled } from 'styled-components';

export const Layout = styled.div`
  border-top: 1px solid #efefef;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 200px;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding-left: 100px;
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    padding-left: 20px;
  }
`;

export const FootLogo = styled.div`
  width: 300px;
  height: 40px;
  margin: 40px 0 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FootTitle = styled.p`
  color: #666;
  font-weight: bold;
`;

export const FootText = styled.p`
  color: var(--black, #121621);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 200%;
`;

export const LinkBox = styled.div`
  display: flex;
  gap: 17px;
  a {
    padding: 0;
    background-color: transparent;
    &:hover {
      color: #643bdc;
      transform: scale(1.2);
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    &:not(:hover) {
      transition: 0.3s ease-out;
    }
  }

  .githubIcon {
    width: 30px;
    height: 30px;
  }

  .notionIcon {
    width: 30px;
    height: 30px;
  }
`;
