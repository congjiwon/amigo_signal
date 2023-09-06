import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FiEdit, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { deletePartnerPost } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
import { supabase } from '../../../api/supabase/supabaseClient';
import { addBookmark, removeBookMark } from '../../../api/supabase/users';
import defaultProfileImage from '../../../assets/imgs/users/default_profile_img.png';
import useCopyClipBoard from '../../../hooks/useCopyClipBoard';
import useSessionStore from '../../../zustand/store';
import { Alert, AlertError, ConfirmDelete } from '../../common/modal/alert';
import * as St from './style';

interface Props {
  partnerPostData: Tables<'partnerPosts'>;
}

const UserFeedback = ({ partnerPostData }: Props) => {
  const { id, createdAt, writerId, openChat } = partnerPostData;
  const { users } = partnerPostData;
  const { nickName, profileImageUrl } = users;
  const [bookMark, setBookMark] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const storagaUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;

  //북마크
  const bookmarkCheck = async (logInUserId: string, postId: string) => {
    try {
      let { data: checkBookmark, error } = await supabase.from('bookmarks').select('*').eq('postId', postId).eq('userId', logInUserId);
      // console.log('checkBookmark', checkBookmark);
      if (error) {
        console.log('북마크 데이터 불러오는데 실패함 ..', error);
      } else {
        setBookMark(checkBookmark!.length > 0);
      }
    } catch (error) {
      console.log('처참히 실패', error);
    }
  };

  useEffect(() => {
    bookmarkCheck(logInUserId!, id);
  }, []);

  const addBookMarkHandle = async () => {
    setBookMark(!bookMark);
    const bookMarkInsert = [{ userId: logInUserId, postId: id }];
    await addBookmark(bookMarkInsert);
  };

  const removeBookMarkHandle = async () => {
    setBookMark(!bookMark);
    await removeBookMark(logInUserId!, id);
  };

  //오픈채팅
  const [, onCopy] = useCopyClipBoard();
  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
    Alert({ title: '복사 완료!' });
  };

  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;

  const mutation = useMutation(deletePartnerPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerPost']);
    },
    onError: () => {
      AlertError({ title: '삭제오류' });
    },
    onSettled: () => {
      navigate('/partner');
    },
  });

  const isPostUser = () => logInUserId === writerId;

  //글삭제
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
          <St.BlackParagraph>{nickName}</St.BlackParagraph>
          <St.GrayParagraph>
            <span>{createdAt.substring(0, 10)}</span>
          </St.GrayParagraph>
        </div>
      </St.UserProfileBox>
      <ButtonBox>
        {logInUserId ? (
          <>
            <button>{bookMark ? <RiBookmarkFill onClick={() => removeBookMarkHandle()} style={{ height: '24px', width: '24px' }} /> : <RiBookmarkLine onClick={() => addBookMarkHandle()} style={{ height: '24px', width: '24px' }} />}</button>
            <button>{openChat.length > 1 && <FiMessageSquare onClick={() => handleCopyClipBoard(openChat)} style={{ height: '24px', width: '24px' }} />}</button>
          </>
        ) : (
          <></>
        )}
        {isPostUser() ? (
          <>
            <button>{<FiEdit style={{ height: '24px', width: '24px' }} onClick={() => navigate(`/partner/write/${id}`)} />}</button>
            <button>{<FiTrash2 onClick={() => handleDelBtn(id)} style={{ height: '24px', width: '24px' }} />}</button>
          </>
        ) : (
          <></>
        )}
      </ButtonBox>
    </St.UserFeedbackBox>
  );
};

export default UserFeedback;

const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    &:hover {
      transform: scale(1.5);
      cursor: pointer;
    }
  }
`;
