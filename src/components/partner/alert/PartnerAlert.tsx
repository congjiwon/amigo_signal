import { useEffect } from 'react';
import { supabase } from '../../../api/supabase/supabaseClient';
import useSessionStore from '../../../zustand/store';
import { fetchPartnerPostTitle } from '../../../api/supabase/partner';
import { useAlertStorageStore, useNewAlertStore } from '../../../zustand/alert';
import { useNavigate } from 'react-router';
import YesAlert from '../../../assets/imgs/header/YesAlert.svg';
import NoAlert from '../../../assets/imgs/header/NoAlert.svg';
import { Popover } from 'antd';
import * as St from './style';
import iconAlert from '../../../assets/imgs/header/icon_alert.png';
import { timeAgo } from '../../common/transferTime/transferTime';
import { v4 as uuidv4 } from 'uuid';

export default function PartnerAlert() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const { alertStorage, addAlertStorage, removeAlertStorage } = useAlertStorageStore();
  const { hasNewAlert, setHasNewAlert } = useNewAlertStore();
  const navigate = useNavigate();

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
              id: uuidv4(),
              logInUserId: userId!,
              applyId: payload.new.id,
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
              id: uuidv4(),
              logInUserId: userId!,
              applyId: payload.new.id,
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
              id: uuidv4(),
              logInUserId: userId!,
              applyId: payload.new.id,
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
  const handleAlertLink = (id: string, postId: string) => {
    navigate(`/partner/detail/${postId}`);
    removeAlertStorage(id);
    if (alertStorage.length === 0) {
      setHasNewAlert(false);
    } else if (alertStorage.length > 0) {
      setHasNewAlert(true);
    }
  };

  const alarmPopover = (
    <St.AlarmPopoverBox>
      <St.MainTitle>{`새로운 소식 (${alertStorage.length})`}</St.MainTitle>
      <St.ListBox>
        {[...alertStorage].reverse().map((item) => (
          <St.ListList onClick={() => handleAlertLink(item.applyId, item.postId)} key={item.applyId}>
            <St.ListItem>
              <div>
                <img src={iconAlert} alt="동행 아이콘" style={{ width: '40px' }} />
              </div>
              <St.PostInfo>
                <St.PostInfoTop>
                  <p>{item.genre === '동행 신청 받음' ? '새로운 동행 신청' : item.genre === '동행 신청 수락됨' ? '동행 신청이 수락되었습니다.' : '동행 신청이 거절되었습니다.'}</p>
                  <St.TimeAgo>{timeAgo(item.date)}</St.TimeAgo>
                </St.PostInfoTop>
                <St.PostTitle>{item.title}</St.PostTitle>
              </St.PostInfo>
            </St.ListItem>
          </St.ListList>
        ))}
      </St.ListBox>
    </St.AlarmPopoverBox>
  );

  return (
    <>
      {hasNewAlert ? (
        <Popover
          content={alarmPopover}
          trigger="hover"
          placement="topRight"
          overlayStyle={{
            width: '282px',
          }}
        >
          <img src={YesAlert} alt="alert" />
        </Popover>
      ) : (
        <Popover
          content={`알람이 없습니다.`}
          trigger="hover"
          placement="topRight"
          overlayStyle={{
            width: '150px',
          }}
        >
          <img src={NoAlert} alt="noAlert" />
        </Popover>
      )}
    </>
  );
}
