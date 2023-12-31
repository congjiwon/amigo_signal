import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Popover } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { addAlert, deleteAlert, getAlertList } from '../../../api/supabase/alert';
import { fetchPartnerPostTitle, getUserNickName } from '../../../api/supabase/partner';
import { supabase } from '../../../api/supabase/supabaseClient';
import NoAlert from '../../../assets/imgs/header/NoAlert.svg';
import YesAlert from '../../../assets/imgs/header/YesAlert.svg';
import iconAlert from '../../../assets/imgs/header/icon_alert.png';
import { useAlertStorageStore, useNewAlertStore } from '../../../zustand/alert';
import useSessionStore from '../../../zustand/store';
import { timeAgo } from '../../common/transferTime/transferTime';
import * as St from './style';

const PENDING = 'pending';
const ACCEPTED = 'accepted';
const REJECTED = 'rejected';

export default function PartnerAlert() {
  const session = useSessionStore((state) => state.session);
  const userId = session?.user.id;
  const { alertStorage, setAlertStorage } = useAlertStorageStore();
  const { hasNewAlert, setHasNewAlert } = useNewAlertStore();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: alertList } = useQuery(['getAlertStorage', userId], () => getAlertList(userId as string), { enabled: !!userId, retry: false });

  const mutationAlertList = useMutation(getAlertList, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAlertStorage', userId]);
    },
  });

  // 초기에 alert DB에서 가져온 data로 default setting
  useEffect(() => {
    if (userId && alertList !== undefined && alertList.data !== null) {
      setAlertStorage(alertList?.data);
    }
  }, [alertList]);

  useEffect(() => {
    if (alertStorage.length === 0) {
      setHasNewAlert(false);
    } else if (alertStorage.length > 0) {
      setHasNewAlert(true);
    }
  }, [alertStorage]);

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
          const applicantNickName = await getUserNickName(payload.new.applicantId);
          if (postTitle && applicantNickName) {
            const newPostInfo = {
              id: uuidv4(),
              applicantNickName,
              logInUserId: userId!,
              applyId: payload.new.id,
              postId: payload.new.postId,
              title: postTitle,
              date: payload.commit_timestamp,
              genre: PENDING,
            };
            await addAlert(newPostInfo);
            mutationAlertList.mutate(userId!);
            setHasNewAlert(true);
          }
        }
        // 신청자가 참여 취소 시
        if (payload.eventType === 'DELETE') {
          await deleteAlert(payload.old.id, PENDING);
          mutationAlertList.mutate(userId!);
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
          const applicantNickName = await getUserNickName(payload.new.applicantId);
          if (postTitle && applicantNickName) {
            const newPostInfo = {
              id: uuidv4(),
              applicantNickName,
              logInUserId: userId!,
              applyId: payload.new.id,
              postId: payload.new.postId,
              title: postTitle,
              date: payload.commit_timestamp,
              genre: ACCEPTED,
            };
            await addAlert(newPostInfo);
            mutationAlertList.mutate(userId!);
            setHasNewAlert(true);
          }
        }
        // 작성자가 거절했을 때
        if (payload.eventType === 'UPDATE' && payload.new.isConfirmed && !payload.new.isAccepted) {
          const postTitle = await fetchPartnerPostTitle(payload.new.postId);
          const applicantNickName = await getUserNickName(payload.new.applicantId);
          if (postTitle && applicantNickName) {
            const newPostInfo = {
              id: uuidv4(),
              applicantNickName,
              logInUserId: userId!,
              applyId: payload.new.id,
              postId: payload.new.postId,
              title: postTitle,
              date: payload.commit_timestamp,
              genre: REJECTED,
            };
            await addAlert(newPostInfo);
            mutationAlertList.mutate(userId!);
            setHasNewAlert(true);
          }
        }
      },
    )
    .subscribe();

  const handleAlertLink = async (id: string, postId: string, genre: string) => {
    navigate(`/partner/detail/${postId}`);
    await deleteAlert(id, genre);
    // removeAlertStorage(id);
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
          <St.ListList onClick={() => handleAlertLink(item.applyId, item.postId, item.genre)} key={item.id}>
            <St.ListItem>
              <div>
                <img src={iconAlert} alt="동행 아이콘" style={{ width: '40px' }} />
              </div>
              <St.PostInfo>
                <St.PostInfoTop>
                  <p>{item.genre === PENDING ? `동행신청 | ${item.applicantNickName} 님` : item.genre === ACCEPTED ? '동행신청이 수락되었습니다.' : '동행신청이 거절되었습니다.'}</p>
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
            width: '300px',
            zIndex: 9999,
          }}
        >
          <img src={YesAlert} alt="alert" style={{ width: '20px', height: '22px' }} />
        </Popover>
      ) : (
        <Popover
          content={`알람이 없습니다.`}
          trigger="hover"
          placement="topRight"
          overlayStyle={{
            width: '150px',
            zIndex: 9999,
          }}
        >
          <img src={NoAlert} alt="noAlert" style={{ width: '24px', height: '24px' }} />
        </Popover>
      )}
    </>
  );
}
