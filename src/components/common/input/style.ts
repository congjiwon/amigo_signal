import styled, { css } from 'styled-components';
import { InputProps } from './Input';

type TextareaProps = Omit<InputProps, 'type'>;

interface BaseStylesProps {
  inputStyleType: 'comment' | 'auth' | 'search' | 'write' | 'apply';
  border: boolean;
}

const baseStyles = css<BaseStylesProps>`
  outline: none;

  ${(props) => {
    switch (props.inputStyleType) {
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
          width: 350px;
          height: 15px;
          padding: 7px 10px;
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
          width: 40vw;
          height: 20vw;
          padding: 10px;
          &::-webkit-scrollbar {
            display: none;
          }
        `;
    }
  }}

  ${(props) =>
    props.border
      ? css`
          border: 1px solid gray;
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
