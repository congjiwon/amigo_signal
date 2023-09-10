import * as St from './style';
import logo from '../../../assets/imgs/Logo/logo.png';
import One from '../../../assets/imgs/Logo/One.png';
const Footer = () => {
  return (
    <St.Layout>
      <St.FooterContainer>
        <div>
          <St.FootLogo>
            <img src={logo} style={{ width: '40px' }} />
            <img src={One} style={{ width: '120px' }} />
          </St.FootLogo>
        </div>
        <St.FootText>내일배움캠프 React 6 </St.FootText>
        <St.FootText>양지원 | 임설빈 | 송현섭 | 임지영 | 박희연 | Designed by 김수연</St.FootText>
        <St.FootText style={{ marginBottom: '60px' }}>&copy; 2023 NBC AMIGO SIGNAL ALL RIGHTS RESERVED</St.FootText>
      </St.FooterContainer>
    </St.Layout>
  );
};

export default Footer;
