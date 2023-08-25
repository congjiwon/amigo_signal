import { styled } from 'styled-components';

export const MyContentsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minMax(0px, 1fr));
  padding: 60px 32px;
  background-color: #efefef;
`;

export const MyContentsLeftBox = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
`;

export const MyContentsTab = styled.button`
  margin-bottom: 4px;
  padding: 5px 20px;
  background-color: #eee;
  border: 0;
  cursor: pointer;

  &.active {
    background-color: #7066e0;
    color: #fff;
  }
`;

export const MyContentsRightBox = styled.div`
  grid-column: 2 / 5;
`;

export const MyContentTabPanel = styled.div`
  display: none;

  &.active {
    display: block;
  }
`;
