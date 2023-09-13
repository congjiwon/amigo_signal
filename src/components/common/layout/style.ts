import { styled } from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  min-width: 360px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 285px);
  padding: 70px 0px 0 0px;
`;
