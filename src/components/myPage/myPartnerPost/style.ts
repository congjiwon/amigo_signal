import { styled } from 'styled-components';

export const MyPartnerPostsWrapper = styled.div`
  border: 1px solid blue;
`;

export const MyPartnerPostCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minMax(0px, 1fr));
  padding: 2rem;
  border: 1px solid red;
`;

export const MyPartnerPostCard = styled.div`
  padding: 2rem;
  border: 1px solid red;
`;
