import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

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
              <Link to="/mypage">{currentUser?.nickName}&nbsp;님</Link>
              <Link to="/login" style={{ marginLeft: '20px' }} onClick={handleSignout}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup" style={{ marginLeft: '20px' }}>
                회원가입
              </Link>
            </>
          )}
        </St.Utils>
      </St.Header>
    </St.HeaderLayout>
  );
}
