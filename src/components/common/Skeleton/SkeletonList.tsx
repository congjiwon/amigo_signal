import { Skeleton, Space } from 'antd';
import * as St from './style';

const SkeletonList: React.FC = () => {
  const skeletonCount = 8;
  const skeletonItems = new Array(skeletonCount).fill('').map((_, index) => (
    <Space key={index}>
      <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
    </Space>
  ));

  // return <St.Grid>{skeletonItems}</St.Grid>;

  return (
    <>
      <St.Grid>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
        <Space>
          <Skeleton.Image active={true} style={{ width: '282px', height: '282px' }} />
        </Space>
      </St.Grid>
    </>
  );
};
export default SkeletonList;
