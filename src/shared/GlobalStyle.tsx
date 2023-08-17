import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const styled = { createGlobalStyle };
const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: 'Roboto', normal, 'Gowun Dodum', normal, sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input::selection,
  ::selection {
    background-color: #000000;
    color: #ffffff;
  }

  button {
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
`;

export default GlobalStyle;
