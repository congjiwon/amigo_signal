import { styled } from 'styled-components';

export const AlarmPopoverBox = styled.div`
  padding: 8px 12px 20px 12px;
`;

export const MainTitle = styled.p`
  color: #121621;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
`;

export const ListBox = styled.ul`
  margin-top: 25px;
`;

export const ListList = styled.li`
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const ListItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 40px;
    vertical-align: middle;
  }
`;

export const PostInfo = styled.div`
  width: calc(100% - 50px);
`;

export const PostInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    font-size: 12px;
  }
`;

export const TimeAgo = styled.p`
  color: #6c7486;
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
`;

export const PostTitle = styled.p`
  margin-top: 5px;
  color: #121621;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
