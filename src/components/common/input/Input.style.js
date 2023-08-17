import { css, styled } from "styled-components";
import { SIZE, THEME } from "./Input.constants";

export const Input = styled.input.attrs(props => ({
  as: props.as || "input"
}))`
  ${props => css`
    width: ${SIZE[props.size]?.width};

    padding: 7px 10px;

    background-color: ${THEME[props.$bgcolor]?.backgroundColor};
    border: none;
    border-radius: 5px;
    outline: none;

    color: ${THEME[props.$bgcolor]?.color};
    font-size: 16px;

    &[type="radio"] {
    }
    &[type="file"] {
      width: 100%;
      &:hover {
        background-color: ${props => props.theme.colors.theme1};
      }
      &::-webkit-file-upload-button {
        width: 100px;
        height: 35px;

        margin-right: 20px;

        background-color: ${props => props.theme.colors.theme1};
        border-radius: 5px;

        font-size: 16px;
        color: white;
        border: none;
        outline: none;
      }
    }

    ${props.as === "textarea" &&
    css`
      width: ${SIZE[props.size]?.width};
      height: 200px;

      padding: 7px 10px;

      background-color: ${THEME[props.$bgcolor]?.backgroundColor};
      border: none;
      border-radius: ${SIZE[props.size]?.borderRadius};
      outline: none;

      color: ${THEME[props.$bgcolor]?.color};
      font-size: 16px;

      resize: none;
    `}
  `}
`;
