import { Link } from 'react-router-dom';
import * as St from './style';

export default function Header() {
  return (
    <St.Header>
      <St.H1>
        <Link to="/">Amigo Signal</Link>
      </St.H1>
      <St.Gnb>
        <ul>
          <li>
            <Link to="/partner">동행 찾기</Link>
          </li>
          <li>
            <Link to="/spotshare">스팟 공유</Link>
          </li>
        </ul>
      </St.Gnb>
      <St.Utils>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </St.Utils>
    </St.Header>
  );
}
