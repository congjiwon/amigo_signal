import { useQuery } from '@tanstack/react-query';
import { Popover } from 'antd';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../../api/supabase/supabaseClient';
import { getCurrentUser } from '../../../api/supabase/users';
import logo from '../../../assets/imgs/Logo/logo.png';
import useCurrentUserStore from '../../../zustand/currentUser';
import useSessionStore from '../../../zustand/store';
import One from '../../../assets/imgs/Logo/One.png';

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

  const myPagePopover = (
    <St.MyPagePopover>
      <NavLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>
        마이페이지
      </NavLink>
      <Link to="/login" onClick={handleSignout}>
        로그아웃
      </Link>
    </St.MyPagePopover>
  );

  return (
    <St.HeaderLayout>
      <St.Header>
        <St.H1>
          <Link to="/">
            <img src={logo} style={{ width: '40px' }} />
            <img src={One} style={{ width: '120px' }} />
          </Link>
        </St.H1>
        <St.Gnb>
          <ul>
            <li>
              <NavLink to="/partner" className={({ isActive }) => (isActive ? 'active' : '')}>
                동행 찾기
              </NavLink>
            </li>
            <li>
              <NavLink to="/spotshare" className={({ isActive }) => (isActive ? 'active' : '')}>
                스팟 공유
              </NavLink>
            </li>
          </ul>
        </St.Gnb>
        <St.Utils>
          {session ? (
            <>
              <Popover content={myPagePopover} trigger="hover" placement="topRight">
                <St.PopOverButton>{currentUser?.nickName}님</St.PopOverButton>
              </Popover>

              {/* <NavLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>
                {currentUser?.nickName}
                &nbsp;님
              </NavLink> */}
              {/* <Link to="/login" onClick={handleSignout}>
                로그아웃
              </Link> */}
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </St.Utils>
      </St.Header>
    </St.HeaderLayout>
  );
}
