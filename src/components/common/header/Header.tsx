import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../api/supabase/supabaseClient';
import { getCurrentUser } from '../../../api/supabase/users';
import useCurrentUserStore from '../../../zustand/currentUser';
import useSessionStore from '../../../zustand/store';
import { Popover, Drawer } from 'antd';
import { Alert } from '../modal/alert';
import PartnerAlert from '../../partner/alert/PartnerAlert';
import * as St from './style';
import logoHeader from '../../../assets/imgs/Logo/logo_header.png';
import defaultImg from '../../../assets/imgs/users/default_profile_img.png';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { BiX } from 'react-icons/bi';

export default function Header() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const userId = session?.user.id;
  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

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

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
    <St.HeaderLayout className="header-layout">
      <St.Header>
        <St.H1>
          <Link to="/">
            <img src={logoHeader} style={{ width: '144px' }} />
          </Link>
        </St.H1>
        {/* web */}
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
              <PartnerAlert />
              <Popover content={myPagePopover} trigger="hover" placement="topRight">
                <St.UserBox>
                  <St.ProfileImg src={currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg} alt={`${currentUser?.nickName} 프로필 이미지`} />
                  <St.NickName>{currentUser?.nickName} 님</St.NickName>
                  <St.PopOverButton>
                    <FiChevronDown style={{ verticalAlign: 'middle' }} />
                  </St.PopOverButton>
                </St.UserBox>
              </Popover>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </St.Utils>

        {/* mobile */}
        <St.MobileMenu>
          {session && <PartnerAlert />}

          <FiMenu onClick={showDrawer} className="hambuger-menu" />

          <Drawer placement="right" onClose={onClose} closable={false} open={open} width={307} bodyStyle={{ padding: '0' }}>
            <div>
              <St.DrawerHeader>
                {session ? (
                  <St.UserBoxM>
                    <St.ProfileImgM src={currentUser?.profileImageUrl ? `${storagaUrl}/${currentUser?.profileImageUrl}` : defaultImg} alt={`${currentUser?.nickName} 프로필 이미지`} />
                    <St.NickNameM>{currentUser?.nickName} 님</St.NickNameM>
                  </St.UserBoxM>
                ) : (
                  <St.LoginBoxM>
                    <Link to="/login" className="link-login">
                      로그인
                    </Link>
                    <Link to="/signup" className="link-join">
                      회원가입
                    </Link>
                  </St.LoginBoxM>
                )}
                <BiX onClick={onClose} className="icon-close-menu" title="닫기" />
              </St.DrawerHeader>

              <St.DrawerBody>
                <St.GnbM>
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
                </St.GnbM>

                {session && (
                  <St.UserMenuM>
                    <NavLink to="/mypage" className="btn-mypage">
                      마이페이지
                    </NavLink>
                    <Link to="/login" onClick={handleSignout} className="btn-logout">
                      로그아웃
                    </Link>
                  </St.UserMenuM>
                )}
              </St.DrawerBody>
            </div>
          </Drawer>
        </St.MobileMenu>
      </St.Header>
    </St.HeaderLayout>
  );
}
