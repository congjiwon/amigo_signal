import loading_gif from '../../../assets/imgs/loading/loading_gif.gif';
import * as St from './style';

const LoadingSpinner = () => {
  return (
    <St.SpinnerContainer>
      <St.SpinnerBox>
        <img src={loading_gif} alt="amigo-signal" style={{ width: '100px' }} />
        <St.LoadingParagraph>Loading...</St.LoadingParagraph>
      </St.SpinnerBox>
    </St.SpinnerContainer>
  );
};

export default LoadingSpinner;
