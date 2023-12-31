import { styled } from 'styled-components';

interface InnerProps {
  size?: 'large' | 'medium' | 'small';
}

export const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #00000029;
  z-index: 999;
`;

export const Inner = styled.div<InnerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto;
  padding-bottom: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 5px 5px 12px rgba(23, 23, 23, 0.3);

  ${({ size }) => {
    switch (size) {
      case 'large':
        return `
        width: 51.87%;
        height: 68.33%;
        border-radius: 30px;

        @media screen and (max-width: 1256px) {
          width: 60%;
        }
        @media screen and (max-width: 1024px) {
          width: 65%;
        }
        @media screen and (max-width: 820px) {
          width: 70%;
        }
        @media screen and (max-width: 744px) {
          width: 75%;
        }
        @media screen and (max-width: 701px) {
          width: 80%;
        }
        @media screen and (max-width: 655px) {
          width: 85%;
        }
        @media screen and (max-width: 612px) {
          width: 90%;
        }
        `;
      case 'medium':
        return `
        width: 41.25%;
        height: auto;
        border-radius: 30px;

        @media screen and (max-width: 1256px) {
          width: 45%;
        }
        @media screen and (max-width: 1156px) {
          width: 50%;
        }
        @media screen and (max-width: 1024px) {
          width: 55%;
        }
        @media screen and (max-width: 914px) {
          width: 60%;
        }
        @media screen and (max-width: 807px) {
          width: 65%;
        }
        @media screen and (max-width: 733px) {
          width: 70%;
        }
        @media screen and (max-width: 664px) {
          width: 75%;
        }
        @media screen and (max-width: 525px) {
          width: 80%;
        }
        @media screen and (max-width: 390px) {
          width: 90%;
        }
        `;
      case 'small':
        return `
          justify-content: center;
          align-items: center;

          gap: 20px;
          margin: 340px 16px 0 16px;
          text-align: center;
          line-height: 30px;
          width: 360px;
          height: 220px;
          padding: 5px 10px;
          
        `;
      default:
        return `
          width: 500px;
          height: 60%;
        `;
    }
  }}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 37px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 0px;
  background: none;
  border: none;
  cursor: pointer;
`;
