import { styled } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #efefef;
  width: 100%;
  height: 245px;
  top: 0;
  left: 0;
`;

export const FooterContainer = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 24px;
  max-width: 1200px;
  padding-left: 20px;
  padding-right: 20px;
  & p {
    color: var(--black, #121621);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 200%;

    @media (max-width: 430px) {
      font-size: 12px;
      line-height: 180%;
    }
  }
`;

export const FootLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FootInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
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
