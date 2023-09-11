import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { FiEdit, FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { addBookmark, bookmarkCheck, deletePartnerPost, removeBookMark } from '../../../api/supabase/partner';
import { Tables } from '../../../api/supabase/supabase';
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
  const bookmarkCheckHanlde = async (logInUserId: string, postId: string) => {
    const data = await bookmarkCheck(logInUserId, postId);
    setBookMark(data!.length > 0);
  };

  useEffect(() => {
    bookmarkCheckHanlde(logInUserId!, id);
  }, []);

  //디바운싱
  const debouncedAddBookMarkHandle = _.debounce(async () => {
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
    onCopy(text);
    Alert({ title: '복사 완료!' });
  };

  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;

  const mutation = useMutation(deletePartnerPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerPost']);
      navigate('/partner');
    },
    onError: () => {
      AlertError({ title: '삭제오류' });
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
      <St.ButtonBox>
        {logInUserId ? (
          <>
            <button>{openChat.length > 1 && <FiMessageSquare className="lineIcon" onClick={() => handleCopyClipBoard(openChat)} />}</button>
            <button>{bookMark ? <RiBookmarkFill className="fillIcon" onClick={debouncedRemoveBookMarkHandle} /> : <RiBookmarkLine className="lineIcon" onClick={debouncedAddBookMarkHandle} />}</button>
          </>
        ) : (
          <></>
        )}
        {isPostUser() ? (
          <>
            <button>{<FiEdit className="lineIcon" onClick={() => navigate(`/partner/write/${id}`)} />}</button>
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
