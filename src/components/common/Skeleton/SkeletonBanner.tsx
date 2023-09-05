import { Skeleton } from 'antd';
import { styled } from 'styled-components';

const SkeletonBanner = () => {
  return (
    <SkeletonBox>
      <Skeleton.Image active={true} style={{ display: 'flex', width: '1200px', height: '400px', padding: '20px', justifyContent: 'center' }} />
    </SkeletonBox>
  );
};

export default SkeletonBanner;

const SkeletonBox = styled.div`
  & svg {
    display: none;
  }
`;
