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
        width: 60%;
        height: 70%;
        border-radius: 30px;

        @media screen and (max-width: 800px) {
          width: 80%;
        }
        `;
      case 'medium':
        return `
        width: 45%;
        height: 55%;
        border-radius: 30px;

        @media screen and (max-width: 1100px) {
          width: 60%;
        }

        @media screen and (max-width: 700px) {
          width: 80%;
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
  display: flex;
  justify-content: flex-end;
  padding: 30px;
  padding-bottom: 0px;
  background: none;
  border: none;
  cursor: pointer;
`;
