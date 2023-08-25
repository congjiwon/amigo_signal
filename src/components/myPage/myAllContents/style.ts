import { styled } from 'styled-components';

export const MyAllContentsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minMax(0px, 1fr));
  padding: 60px 32px;
  background-color: #efefef;
`;

export const MyAllContentsLNB = styled.div`
  grid-column: 1;
`;

export const MyAllContentsPanel = styled.div`
  grid-column: 2 / 5;
`;
