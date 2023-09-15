import { styled } from 'styled-components';

export const ErrorLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
`;

export const ErrorContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 10px;

  @media (max-width: 840px) {
    flex-direction: column;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 16px;
  }

  & h1 {
    color: var(--black, #121621);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;

    @media (max-width: 840px) {
      flex-direction: column;
      text-align: center;
    }

    @media (max-width: 500px) {
      font-size: 18px;
    }
  }

  & p {
    color: var(--gray2, #6c7486);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    text-transform: uppercase;

    @media (max-width: 840px) {
      flex-direction: column;
      text-align: center;
    }

    @media (max-width: 500px) {
      font-size: 14px;
    }
  }
`;

export const ErrorImg = styled.img`
  width: 344px;
  height: 344px;
  @media (max-width: 500px) {
    width: 120px;
    height: 120px;
  }
`;

export const ErrorDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 500px) {
    gap: 16px;
  }
`;

export const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 840px) {
    /* justify-content: center; */
    align-items: center;
  }
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
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 221px;
  }
`;
