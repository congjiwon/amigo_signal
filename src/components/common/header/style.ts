import { styled } from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 32px 16px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

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
