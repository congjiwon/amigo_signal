import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, auto));
  grid-gap: 24px;
  place-items: center;
  margin: 50px auto;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(2, minmax(200px, auto));
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(200px, auto));
  }
`;
