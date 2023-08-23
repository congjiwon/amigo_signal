import { Link, useNavigate } from 'react-router-dom';
import * as St from './style';
import { supabase } from '../../../api/supabase/supabaseClient';
import useSessionStore from '../../zstand/store';
import { useEffect } from 'react';
import { Alert } from '../modal/alert';

export default function Header() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  // const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const addedSession = session?.user.user_metadata;
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    Alert({ title: '로그아웃 되었습니다.' });
    navigate('/login');
  };

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
        {session ? (
          <>
            <span>{addedSession?.nickName}&nbsp;님</span>
            <Link to="/mypage">마이페이지</Link>
            <button onClick={handleSignout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </St.Utils>
    </St.Header>
  );
}
