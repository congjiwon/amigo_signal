import { styled } from 'styled-components';

export const MyPartnerPostsSection = styled.section`
  & h2 {
    margin-bottom: 48px;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const FilterBtns = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 33px;
`;
export const FilterBtn = styled.button`
  padding: 7px 14px;
  color: #81858a;
  background-color: #e8ebee;
  border-radius: 18px;
  border: 0;
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
`;

export const MyPartnerPostCard = styled.div`
  padding: 20px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
