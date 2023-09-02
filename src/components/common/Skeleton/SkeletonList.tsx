import { Skeleton, Space } from 'antd';
import * as St from './style';

const SkeletonList: React.FC = () => {
  return (
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
    </St.Grid>
  );
};

export default SkeletonList;
