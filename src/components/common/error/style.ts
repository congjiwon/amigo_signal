import { styled } from 'styled-components';

export const ErrorLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`;

export const ErrorContainer = styled.section`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  & h1 {
    color: var(--black, #121621);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }
  & p {
    color: var(--gray2, #6c7486);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }
`;

export const ErrorImg = styled.img`
  width: 344px;
  height: 344px;
`;

export const ErrorDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HomeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 242px;
  height: 56px;
  border-radius: 10px;
  background: var(--purple, #643bdc);
  border: 0;
  color: #fff;
  cursor: pointer;
`;
