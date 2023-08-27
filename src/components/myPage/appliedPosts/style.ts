import { styled } from 'styled-components';

export const AppliedPostsSection = styled.section`
  & h2 {
    margin-bottom: 48px;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const FilterBtns = styled.div`
  display: flex;
  gap: 16px;
`;
export const FilterBtn = styled.button`
  padding: 7px 14px;
  color: #81858a;
  background-color: #e8ebee;
  border: 0;
  border-radius: 18px;
  cursor: pointer;

  &.active {
    color: #fff;
    background-color: #000;
  }
`;

export const AppliedPostCardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minMax(0px, 1fr));
  gap: 40px;
  padding: 1rem 0;
`;

export const AppliedPostCard = styled.li`
  padding: 20px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  & img {
    width: 50px;
  }
`;
