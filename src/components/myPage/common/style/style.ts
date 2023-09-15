import { styled } from 'styled-components';

export const MyFilterBtns = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 33px;
`;

export const MyFilterBtn = styled.button`
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

export const MyCards = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minMax(0px, 1fr));
  gap: 32px 24px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, minMax(0px, 1fr));
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(1, minMax(0px, 1fr));
  }
`;

export const MyCard = styled.li`
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  & a {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const PaddingBox = styled.div`
  padding: 24px 20px;
  box-sizing: border-box;
`;

export const MsgNoData = styled.p`
  margin: 148px 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
`;

export const CountryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > div {
    position: relative;
    width: 50px;
    height: 36px;
    border: 1px solid #e3e9f3;
    border-radius: 3px;
    overflow: hidden;
    background-color: #e8ebee;

    & img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
    }
  }

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
  }
`;

export const OpenStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 78px;
  height: 32px;
  font-size: 12px;
  color: #643bdc;
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: -0.3px;
  box-sizing: border-box;
  border: 1px solid #643bdc;
  border-radius: 18px;
`;

export const DateInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #121621;
  line-height: 1.5;

  & svg {
    color: #6c7486;
    font-size: 16px;
  }
`;

export const CardTitle = styled.h3`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.partner-title {
    margin: 14px 0 8px;
  }

  &.spot-title {
    margin: 20px 0 10px;
  }
`;

export const InterestList = styled.ul`
  display: flex;
  gap: 5px;

  & li {
    width: 40px;
    height: 40px;

    & img {
      width: 100%;
    }
  }
`;

export const numOfPeople = styled.div`
  padding: 6px 14px;
  color: #81858a;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.3px;
  background-color: #e8ebee;
  border-radius: 18px;

  & span {
    color: #000;
  }
`;

export const UserInfoMain = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > div {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;

    & img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
    }
  }

  p {
    color: #000;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
  }
`;

export const UserInfoSub = styled.p`
  color: #81858a;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.partner-top {
    margin-bottom: 36px;
  }

  &.partner-bottom {
    margin-top: 10px;
    padding-top: 12px;
    border-top: 1px solid #e8ebee;
  }
`;

export const PaginationBox = styled.div`
  text-align: center;
  margin-top: 40px;

  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-item {
    border-radius: 50%;
  }

  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-item:not(.ant-pagination-item-active):hover {
    background-color: transparent;
    & a {
      font-weight: 600;
      color: #000;
    }
  }

  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-item-active {
    border-color: transparent;
  }

  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-item a {
    color: #6c7486;
  }

  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-item-active a {
    color: #000;
  }

  /* prev, next */
  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-prev .ant-pagination-item-link,
  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-prev .ant-pagination-item-link,
  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-next .ant-pagination-item-link {
    border-radius: 50%;
    background-color: #e3e9f3;
  }
  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-prev.ant-pagination-disabled:hover .ant-pagination-item-link,
  :where(.css-dev-only-do-not-override-byeoj0).ant-pagination .ant-pagination-next.ant-pagination-disabled:hover .ant-pagination-item-link {
    background-color: #e3e9f3;
  }
`;

export const ContentEllipsis = styled.div`
  display: -webkit-box;
  height: 36px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #81858a;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
`;

export const BgCountryBox = styled.div`
  position: relative;
  height: 140px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: #eee;
  overflow: hidden;
`;

export const BgCountryImg = styled.img`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const BadgeCountry = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
`;

export const LikeButton = styled.button`
  padding: 20px;
  background-color: transparent;
  border: none;
  &:hover {
    transform: scale(1.2);
    transition: transform 0.3s ease;
  }
  &:not(:hover) {
    transition: 0.3s ease-out;
  }
  cursor: pointer;
`;

export const Heart = {
  height: '24px',
  width: '24px',
  color: '#670fdf',
};
