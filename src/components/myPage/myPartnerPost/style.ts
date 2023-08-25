import { styled } from 'styled-components';

export const MyPartnerPostsWrapper = styled.div`
  padding: 0 8cap;
`;

export const FilterBtns = styled.div`
  display: flex;
  gap: 7px;
`;
export const FilterBtn = styled.button`
  padding: 5px 20px;
  background-color: #eee;
  border: 1px solid #777;
  border-radius: 12px;
  cursor: pointer;

  &.active {
    background-color: #222;
    border-color: #222;
    color: #fff;
  }
`;

export const MyPartnerPostCardList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minMax(0px, 1fr));
  gap: 40px;
  padding: 1rem 0;
`;

export const MyPartnerPostCard = styled.div`
  padding: 2rem;
  border: 1px solid red;
  cursor: pointer;
`;
