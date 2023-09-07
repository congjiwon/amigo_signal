import { Skeleton } from 'antd';
import * as St from './style';

const SkeletonList = () => {
  const skeletonCount = 8;
  const skeletonItems = new Array(skeletonCount).fill('').map((_, index) => (
    <St.PostCard key={index}>
      <Skeleton avatar active={true} paragraph={{ rows: 4 }} style={{ padding: '20px' }} />
    </St.PostCard>
  ));

  return <St.Grid>{skeletonItems}</St.Grid>;
};

export default SkeletonList;
