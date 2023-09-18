import { RxGithubLogo, RxNotionLogo } from 'react-icons/rx';
import logoHeader from '../../../assets/imgs/Logo/logo_header.png';
import * as St from './style';

const Footer = () => {
  return (
    <St.Layout>
      <St.FooterContainer>
        <St.FootInfoBox>
          <St.FootLogo>
            <img src={logoHeader} style={{ width: '144px' }} alt="아미고 시그널 로고" />
          </St.FootLogo>
          <div>
            <p style={{ fontWeight: 'bold' }}>내일배움캠프 React 6 </p>
            <p>양지원 | 임설빈 | 송현섭 | 임지영 | 박희연 | Designed by 김수연</p>
            <p>&copy; 2023 NBC AMIGO SIGNAL ALL RIGHTS RESERVED</p>
          </div>
        </St.FootInfoBox>
        <St.LinkBox>
          <a href="https://github.com/congjiwon/amigo_signal" target="_blank" rel="noreferrer">
            <RxGithubLogo className="githubIcon" />
          </a>
          <a href="https://www.notion.so/Amigo-Signal-91561b50073848d6bdb8ecb06f83ac25" target="_blank" rel="noreferrer">
            <RxNotionLogo className="notionIcon" />
          </a>
        </St.LinkBox>
      </St.FooterContainer>
    </St.Layout>
  );
};

export default Footer;
