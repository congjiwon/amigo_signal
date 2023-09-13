import { css, styled } from 'styled-components';
import { BtnStyleType } from '../../../types/styleTypes';

const btnCommonStyles = css`
  /* margin-top: 20px; */
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  line-height: 20px;
  cursor: pointer;
`;

const btnCommentStyles = css`
  background-color: transparent;
  border: none;
  font-size: 12px;
  text-decoration: none; // 이걸 disabled만 안주기
  color: var(--gray, #adb1b8);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const CommentButton = styled.button<{ $styleType: BtnStyleType; disabled: boolean | undefined }>`
  ${(props) => {
    if (props.disabled) {
      return css`
        ${btnCommentStyles}
        cursor: not-allowed;
      `;
    } else {
      switch (props.$styleType) {
        case BtnStyleType.BTN_ONLYFONT:
          return css`
            ${btnCommentStyles}
          `;
        case BtnStyleType.BTN_LIKE:
          return css`
            ${btnCommentStyles}
          `;
      }
    }
  }}
`;

export const Button = styled.button<{ $styleType: BtnStyleType; disabled: boolean | undefined; $fullWidth?: boolean }>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  cursor: pointer;

  ${(props) => {
    if (props.disabled) {
      return css`
        ${btnCommonStyles}
        background-color: #777;
        cursor: not-allowed;
      `;
    } else {
      switch (props.$styleType) {
        case BtnStyleType.BTN_PRIMARY:
          return css`
            ${btnCommonStyles}
            background: #FF7000;
          `;
        case BtnStyleType.BTN_SUBMIT:
          return css`
            ${btnCommonStyles}
            background: #198754;
          `;
        case BtnStyleType.BTN_DANGER:
          return css`
            ${btnCommonStyles}
            background: #dc3545;
          `;
        case BtnStyleType.BTN_DARK:
          return css`
            ${btnCommonStyles}
            background: #212529;
          `;
        case BtnStyleType.BTN_DISABLED:
          return css`
            ${btnCommonStyles}
            background: #81858A;
          `;
        case BtnStyleType.BTN_APPLY:
          return css`
            ${btnCommonStyles}
            background: #643bdc;
          `;
        case BtnStyleType.BTN_NOTEXTAPPLY:
          return css`
            ${btnCommonStyles}
            background: #99A3BA;
            &:hover {
              background: #643bdc;
            }
          `;
        case BtnStyleType.BTN_COMMUNICATE:
          return css`
            ${btnCommonStyles}
            background: #643BDC;
          `;
        default:
          return ``;
      }
    }
  }}
`;
