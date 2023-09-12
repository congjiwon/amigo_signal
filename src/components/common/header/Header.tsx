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
import YesAlert from '../../../assets/imgs/header/YesAlert.svg';
import NoAlert from '../../../assets/imgs/header/NoAlert.svg';

import { Alert } from '../modal/alert';
import * as St from './style';
import { useAlertStorageStore, useNewAlertStore } from '../../../zustand/alert';
import { fetchPartnerPostTitle } from '../../../api/supabase/partner';

export default function Header() {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const userId = session?.user.id;

  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);

  const { alertStorage, addAlertStorage, removeAlertStorage } = useAlertStorageStore();
  const { hasNewAlert, setHasNewAlert } = useNewAlertStore();

  const { data: currentUserDB } = useQuery(['currentUser', userId], () => getCurrentUser(userId as string), {
    enabled: !!userId,
  });

  // 작성자 기준
  supabase
    .channel('writers-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'applicants',
        filter: `writerId=eq.${userId}`,
      },
      async (payload) => {
        // 신청자가 있을 때
        if (payload.eventType === 'INSERT' && !payload.new.isConfirmed) {
          const postTitle = await fetchPartnerPostTitle(payload.new.postId);
          if (postTitle) {
            const newPostInfo = {
              id: payload.new.id,
              postId: payload.new.postId,
              title: postTitle,
              date: payload.commit_timestamp,
              genre: '동행 신청 받음',
            };
            addAlertStorage(newPostInfo);
            setHasNewAlert(true);
          }
        }
        // 신청자가 참여 취소 시
        if (payload.eventType === 'DELETE') {
          removeAlertStorage(payload.old.id);
          if (alertStorage.length === 0) {
            setHasNewAlert(false);
          } else if (alertStorage.length > 0) {
            setHasNewAlert(true);
          }
        }
      },
    )
    .subscribe();

  // 신청자 기준
  supabase
    .channel('applicants-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'applicants',
        filter: `applicantId=eq.${userId}`,
      },
      async (payload) => {
        // 작성자가 수락했을 떄
        if (payload.eventType === 'UPDATE' && payload.new.isConfirmed && payload.new.isAccepted) {
          const postTitle = await fetchPartnerPostTitle(payload.new.postId);
          if (postTitle) {
            const newPostInfo = {
              id: payload.new.id,
              postId: payload.new.postId,
              title: postTitle,
              date: payload.commit_timestamp,
              genre: '동행 신청 수락됨',
            };
            addAlertStorage(newPostInfo);
            setHasNewAlert(true);
          }
        }
        // 작성자가 거절했을 때
        if (payload.eventType === 'UPDATE' && payload.new.isConfirmed && !payload.new.isAccepted) {
          const postTitle = await fetchPartnerPostTitle(payload.new.postId);
          if (postTitle) {
            const newPostInfo = {
              id: payload.new.id,
              postId: payload.new.postId,
              title: postTitle,
              date: payload.commit_timestamp,
              genre: '동행 신청 거절됨',
            };
            addAlertStorage(newPostInfo);
            setHasNewAlert(true);
          }
        }
      },
    )
    .subscribe();

  useEffect(() => {
    if (alertStorage.length === 0) {
      setHasNewAlert(false);
    } else if (alertStorage.length > 0) {
      setHasNewAlert(true);
    }
  }, [alertStorage]);

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

  const handleAlertLink = (id: string, postId: string) => {
    navigate(`/partner/detail/${postId}`);
    removeAlertStorage(id);
    console.log('alertSotrage length', typeof alertStorage.length);
    if (alertStorage.length === 0) {
      setHasNewAlert(false);
    } else if (alertStorage.length > 0) {
      setHasNewAlert(true);
    }
  };

  useEffect(() => {
    console.log('hasNewAlert', hasNewAlert);
  }, [hasNewAlert]);

  const alarmPopover = (
    <ul>
      {alertStorage.map((item) => (
        <li onClick={() => handleAlertLink(item.id, item.postId)}>
          <p>{item.genre === '동행 신청 받음' ? '새로운 동행 신청이 있습니다.' : item.genre === '동행 신청 수락됨' ? '동행 신청이 수락되었습니다.' : '동행 신청이 거절되었습니다.'}</p>
          <p key={item.id}>{item.title}</p>
          <p>{item.date}</p>
        </li>
      ))}
    </ul>
  );

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
              {hasNewAlert ? (
                <Popover content={alarmPopover} trigger="click" placement="topRight">
                  <img src={YesAlert} alt="alert" />
                </Popover>
              ) : (
                <Popover content={`알람이 없습니다.`} trigger="click" placement="topRight">
                  <img src={NoAlert} alt="noAlert" />
                </Popover>
              )}
              <Popover content={myPagePopover} trigger="hover" placement="topRight">
                <St.PopOverButton>{currentUser?.nickName}님</St.PopOverButton>
              </Popover>
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
