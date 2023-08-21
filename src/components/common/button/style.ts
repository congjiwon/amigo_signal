import { css, styled } from 'styled-components';
import { BtnStyleType } from '../../../types/styleTypes';

const btnCommonStyles = css`
  margin-top: 20px;
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  line-height: 20px;
`;

export const Button = styled.button<{ $styleType: BtnStyleType }>`
  ${(props) => {
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
      default:
        return ``;
    }
  }}
`;