import styled, { css } from 'styled-components';
import { InputProps } from './Input';

type TextareaProps = Omit<InputProps, 'type'>;

interface BaseStylesProps {
  $inputStyleType: 'comment' | 'auth' | 'search' | 'write' | 'apply';
  $border: boolean;
}

const baseStyles = css<BaseStylesProps>`
  outline: none;

  ${(props) => {
    switch (props.$inputStyleType) {
      case 'comment':
        return css`
          width: 60vw;
          height: 15px;
          padding: 7px 13px;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        `;
      case 'auth':
        return css`
          width: 100%;
          height: 36px;
          padding: 9px 20px;
          box-sizing: border-box;
        `;
      case 'search':
        return css`
          width: 150px;
          height: 20px;
          padding: 4px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        `;
      case 'write':
        return css`
          width: 40vw;
          height: 13px;
          padding: 7px 13px;
          border-radius: 20px;
        `;
      case 'apply':
        return css`
          width: 84.46%;
          height: 32.96%;
          margin: 0px 40px;
          margin-top: 26px;
          padding: 20px 23px 131px 20px;
          border-radius: 20px;
          resize: none;
          &::-webkit-scrollbar {
            display: none;
          }
          @media screen and (max-width: 664px) {
            padding: 20px 23px 233px 20px;
          }
        `;
    }
  }}

  ${(props) =>
    props.$border
      ? css`
          border: 1px solid #e8ebee;
          border-radius: 10px;
        `
      : css`
          border: none;
          border-bottom: 1px solid gray;
        `}
`;

export const Input = styled.input.attrs<InputProps>((props) => ({
  type: props.type,
}))`
  ${baseStyles}
`;

export const Textarea = styled.textarea<TextareaProps>`
  ${baseStyles}
`;
