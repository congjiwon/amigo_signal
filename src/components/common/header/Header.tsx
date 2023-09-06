import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabase/supabaseClient';
import { getCurrentUser } from '../../../api/supabase/users';
import useCurrentUserStore from '../../../zustand/currentUser';
import useSessionStore from '../../../zustand/store';
import { Alert } from '../modal/alert';
import * as St from './style';

export default function Header() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const userId = session?.user.id;

  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);

  const { data: currentUserDB } = useQuery(['currentUser', userId], () => getCurrentUser(userId as string), {
    enabled: !!userId,
  });

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  useEffect(() => {
    currentUserDB && setCurrentUser(currentUserDB);
  }, [currentUserDB]);

  const handleSignout = async () => {
    localStorage.removeItem('authId');
    await supabase.auth.signOut();
    Alert({ title: '로그아웃 되었습니다.' });
    navigate('/login');
  };
  return (
    <St.HeaderLayout>
      <St.Header>
        <St.H1>
          <Link to="/">
            <St.Span>Amigo Signal</St.Span>
          </Link>
        </St.H1>
        <St.Gnb>
          <ul>
            <li>
              <Link to="/partner">
                <St.Span>동행 찾기</St.Span>
              </Link>
            </li>
            <li>
              <Link to="/spotshare">
                <St.Span>스팟 공유</St.Span>
              </Link>
            </li>
          </ul>
        </St.Gnb>
        <St.Utils>
          {session ? (
            <>
              <Link to="/mypage">
                <St.Span>
                  {currentUser?.nickName}
                  &nbsp;님
                </St.Span>
              </Link>
              <Link to="/login" style={{ marginLeft: '20px' }} onClick={handleSignout}>
                <St.Span>로그아웃</St.Span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <St.Span>로그인</St.Span>
              </Link>
              <Link to="/signup" style={{ marginLeft: '20px' }}>
                <St.Span>회원가입</St.Span>
              </Link>
            </>
          )}
        </St.Utils>
      </St.Header>
    </St.HeaderLayout>
  );
}
