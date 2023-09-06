import * as St from './style';
import logo from '../../../assets/imgs/Logo/logo.png';
const Footer = () => {
  return (
    <St.FooterLayout>
      <St.FooterContainer>
        <div>
          <St.FootLogo>
            <img src={logo} style={{ width: '40px' }} />
          </St.FootLogo>
        </div>
        <St.FootTitle>Amigo Signal</St.FootTitle>
        <St.FootText>내일배움캠프 React 6 </St.FootText>
        <St.FootText>양지원 | 임설빈 | 송현섭 | 임지영 | 박희연 | Designed by 김수연</St.FootText>
        <St.FootText>&copy; 2023 NBC AMIGO SIGNAL ALL RIGHTS RESERVED</St.FootText>
      </St.FooterContainer>
    </St.FooterLayout>
  );
};

export default Footer;
