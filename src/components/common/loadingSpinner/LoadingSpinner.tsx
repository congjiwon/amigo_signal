import { Spin } from 'antd';
import * as St from './style';

const LoadingSpinner = () => {
  return (
    <St.SpinnerContainer>
      <St.SpinnerBox>
        <Spin tip="Loading" size="large" />
      </St.SpinnerBox>
    </St.SpinnerContainer>
  );
};

export default LoadingSpinner;
