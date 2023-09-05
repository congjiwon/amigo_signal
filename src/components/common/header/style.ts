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
  padding: 33px 0;
  width: 100%;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;
  & a {
    text-decoration: none;
    color: #222;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const H1 = styled.h1`
  & a {
    font-weight: bold;
  }
`;

export const Gnb = styled.header`
  & ul {
    display: flex;
    gap: 16px;
  }

  & a {
    font-weight: bold;
  }
`;

export const Utils = styled.div`
  display: flex;
  gap: 8px;
`;
