import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { addBookmark, bookmarkCheck, deletePartnerPost, getApplicantList, getConfirmedApplicantList, removeBookMark } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import Messages from '../../../assets/imgs/partner/Messages.png';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import useCopyClipBoard from '../../../hooks/useCopyClipBoard';
import useSessionStore from '../../../zustand/store';
import classifyingAge from '../../common/classifyingAge/classifyingAge';
import { Alert, AlertError, ConfirmDelete } from '../../common/modal/alert';
import * as St from './style';

interface Props {
  partnerPostData: Tables<'partnerPosts'>;
}

const UserFeedback = ({ partnerPostData }: Props) => {
  const { id, createdAt, writerId, openChat } = partnerPostData;
  const { users } = partnerPostData;
  const { nickName, profileImageUrl, birthday, gender } = users;
  const [bookMark, setBookMark] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [applicantList, setApplicantList] = useState<Tables<'applicants'>[]>([]);
  const [confirmedApplicantList, setConfirmedApplicantList] = useState<Tables<'applicants'>[]>([]);

  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  //북마크
  const bookmarkCheckHanlde = async (logInUserId: string, postId: string) => {
    const data = await bookmarkCheck(logInUserId, postId);
    setBookMark(data! && data!.length > 0);
  };

  useEffect(() => {
    bookmarkCheckHanlde(logInUserId!, id);
  }, []);

  //디바운싱
  const debouncedAddBookMarkHandle = _.debounce(async () => {
    if (logInUserId === undefined) {
      navigate('/login');
    }
    setBookMark(!bookMark);
    await addBookmark({ userId: logInUserId!, postId: id });
  }, 300);

  const debouncedRemoveBookMarkHandle = _.debounce(async () => {
    setBookMark(!bookMark);
    await removeBookMark(logInUserId!, id);
  }, 300);

  //오픈채팅
  const [, onCopy] = useCopyClipBoard();
  const handleCopyClipBoard = (text: string) => {
    if (logInUserId === undefined) {
      navigate('/login');
      return;
    }
    onCopy(text);
    Alert({ title: '복사 완료!' });
  };

  // 동행 모집이 시작되면 글 수정 페이지로 못 넘거가도록
  useEffect(() => {
    const fetchApplicant = async () => {
      if (!id) return;
      const { data, error } = await getApplicantList(id);
      if (error || !data) {
        setApplicantList([]);
      } else {
        setApplicantList(data);
      }
    };
    fetchApplicant();

    const fetchConfirmedPartnerList = async () => {
      if (id) {
        const response = await getConfirmedApplicantList(id!);
        if (response.data !== null) {
          setConfirmedApplicantList(response.data);
        }
      }
    };
    fetchConfirmedPartnerList();
  }, [id]);

  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;

  const mutation = useMutation(deletePartnerPost, {
    onSuccess: async () => {
      navigate('/partner');
      await queryClient.invalidateQueries(['PartnerPostsList', null, null, null, null]);
    },
    onError: () => {
      AlertError({ title: '삭제오류' });
    },
  });

  const isPostUser = () => logInUserId === writerId;

  // 글 수정
  const handleEdit = () => {
    if (confirmedApplicantList.length === partnerPostData.numOfPeople) {
      AlertError({ title: '수정이 불가능 합니다.', text: '동행 모집이 완료되었습니다.' });
      return false;
    }
    if (applicantList.length >= 1 || confirmedApplicantList.length >= 1) {
      AlertError({ title: '수정이 불가능 합니다.', text: '동행 신청이 시작되었습니다.' });
      return false;
    }
    navigate(`/partner/write/${id}`);
  };

  // 글 삭제
  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('해당 동행 글이 삭제되었습니다.');
    if (!isConfirmed) {
      return;
    }
    mutation.mutate({ postId: id });
  };

  return (
    <St.UserFeedbackBox>
      <St.UserProfileBox>
        <St.UserProfileImgBox>{profileImageUrl ? <St.UserProfileImg src={`${storagaUrl}/${profileImageUrl!}`} alt="profile" /> : <St.UserProfileImg src={defaultProfileImage} alt="profile" />}</St.UserProfileImgBox>
        <div>
          <St.UserInfoBox>
            <St.BlackParagraph>{nickName}</St.BlackParagraph>
            <St.UserInfoParagraph>
              {classifyingAge(birthday)} | {gender}
            </St.UserInfoParagraph>
          </St.UserInfoBox>
          <St.GrayParagraph>
            <span>{createdAt.substring(0, 10)}</span>
          </St.GrayParagraph>
        </div>
      </St.UserProfileBox>
      <St.ButtonBox>
        <button>{openChat.length > 1 && <img src={Messages} className="kakaoIcon" onClick={() => handleCopyClipBoard(openChat)} alt="오픈채팅 링크 아이콘" />}</button>
        <button>{bookMark ? <RiBookmarkFill className="fillIcon" onClick={debouncedRemoveBookMarkHandle} /> : <RiBookmarkLine className="lineIcon" onClick={debouncedAddBookMarkHandle} />}</button>

        {isPostUser() ? (
          <>
            <button>{<FiEdit className="lineIcon" onClick={handleEdit} />}</button>
            <button>{<FiTrash2 className="lineIcon" onClick={() => handleDelBtn(id)} />}</button>
          </>
        ) : (
          <></>
        )}
      </St.ButtonBox>
    </St.UserFeedbackBox>
  );
};

export default UserFeedback;
