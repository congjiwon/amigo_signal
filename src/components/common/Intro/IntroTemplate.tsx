import introImg from '../../../assets/imgs/Intro/introImg.png';
import logo_gif from '../../../assets/imgs/Logo/logo_gif.gif';
import * as St from './style';

import { FiMapPin, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function IntroTemplate() {
  return (
    <St.IntroLayout>
      <St.IntroImgBox>
        <St.IntroImg src={introImg} alt="Intro" />
      </St.IntroImgBox>

      <St.Container>
        <img src={logo_gif} alt="amigo-signal" style={{ width: '170px' }} />
        <St.ExplanationContainer>
          <St.Span>Amigo Signal과 함께 여행에 동행할 친구를 찾아보세요.</St.Span>
          <St.Span>여행이 더 즐거워질 거예요.</St.Span>
        </St.ExplanationContainer>
        <St.LinkContainer>
          <Link to="/partner">
            <St.LinkIcon>
              {/* <FiUsers style={{ width: '36px', height: '36px', color: 'white' }} /> */}
              <FiUsers className="FiIcon" />
            </St.LinkIcon>
            <St.Paragraph>동행 찾기</St.Paragraph>
          </Link>
          <Link to="/spotshare">
            <St.LinkIcon>
              {/* <FiMapPin style={{ width: '36px', height: '36px', color: 'white' }} /> */}
              <FiMapPin className="FiIcon" />
            </St.LinkIcon>
            <St.Paragraph>스팟 공유</St.Paragraph>
          </Link>
        </St.LinkContainer>
      </St.Container>
    </St.IntroLayout>
  );
}

export default IntroTemplate;
