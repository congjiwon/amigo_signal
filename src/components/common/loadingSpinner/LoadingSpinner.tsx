import logo_gif from '../../../assets/imgs/Logo/logo_gif.gif';
import * as St from './style';
// import { Spin } from 'antd';

const LoadingSpinner = () => {
  return (
    <St.SpinnerContainer>
      <St.SpinnerBox>
        {/* <Spin tip="Loading" size="large" /> */}
        <img src={logo_gif} alt="amigo-signal" style={{ width: '100px' }} />
        <St.LoadingParagraph>Loading...</St.LoadingParagraph>
      </St.SpinnerBox>
    </St.SpinnerContainer>
  );
};

export default LoadingSpinner;
