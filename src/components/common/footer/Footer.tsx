import { RxGithubLogo, RxNotionLogo } from 'react-icons/rx';
import One from '../../../assets/imgs/Logo/One.png';
import logo from '../../../assets/imgs/Logo/logo.png';
import * as St from './style';

const Footer = () => {
  return (
    <St.Layout>
      <St.FooterContainer>
        <St.FootInfoBox>
          <St.FootLogo>
            <img src={logo} style={{ width: '40px' }} />
            <img src={One} style={{ width: '120px' }} />
          </St.FootLogo>
          <div>
            <p style={{ fontWeight: 'bold' }}>내일배움캠프 React 6 </p>
            <p>양지원 | 임설빈 | 송현섭 | 임지영 | 박희연 | Designed by 김수연</p>
            <p>&copy; 2023 NBC AMIGO SIGNAL ALL RIGHTS RESERVED</p>
          </div>
        </St.FootInfoBox>
        <St.LinkBox>
          <a href="https://github.com/congjiwon/amigo_signal" target="_blank">
            <RxGithubLogo className="githubIcon" />
          </a>
          <a href="https://github.com/congjiwon/amigo_signal" target="_blank">
            <RxNotionLogo className="notionIcon" />
          </a>
        </St.LinkBox>
      </St.FooterContainer>
    </St.Layout>
  );
};

export default Footer;
