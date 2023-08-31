import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { deletePartnerPost } from '../../../api/supabase/partner';
import { supabase } from '../../../api/supabase/supabaseClient';
import { addBookmark, getUser, removeBookMark } from '../../../api/supabase/users';
import useCopyClipBoard from '../../../hooks/useCopyClipBoard';
import useSessionStore from '../../../zustand/store';
import { Alert, ConfirmDelete } from '../../common/modal/alert';
import * as St from './style';

interface Props {
  id: string;
  createdAt: string;
  writerId: string;
  openChat: string;
}

const UserFeedback = ({ id, createdAt, writerId, openChat }: Props) => {
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
  const { data: postUser, isLoading, isError } = useQuery(['user', writerId], () => getUser({ userId: writerId as string }));

  const mutation = useMutation(deletePartnerPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerPost']);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  const { id: userId, nickName, profileImageUrl } = postUser.data!;
  const isPostUser = () => logInUserId === userId;

  //글삭제
  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('해당 동행 글이 삭제되었습니다.');
    if (!isConfirmed) {
      return;
    }
    try {
      mutation.mutate({ postId: id });
      navigate('/partner');
    } catch (error) {}
  };

  return (
    <St.UserFeedbackBox>
      <St.UserProfileBox>
        <St.UserProfileImgBox>
          <St.UserProfileImg src={`${storagaUrl}/${profileImageUrl!}`} alt="Image" />
        </St.UserProfileImgBox>
        <div>
          <St.BlackParagraph>{nickName}</St.BlackParagraph>
          <St.GrayParagraph>
            <span>{createdAt.substring(0, 10)}</span>
          </St.GrayParagraph>
        </div>
      </St.UserProfileBox>
      {isPostUser() ? (
        <div>
          <button onClick={() => navigate(`/partner/write/${id}`)}>수정</button>
          <button onClick={() => handleDelBtn(id)}>삭제</button>
        </div>
      ) : (
        <></>
      )}
      {logInUserId ? (
        <div>
          <div>{bookMark ? <RiBookmarkFill onClick={() => removeBookMarkHandle()} /> : <RiBookmarkLine onClick={() => addBookMarkHandle()} />}</div>
          <div>{openChat.length > 1 && <FiMessageSquare onClick={() => handleCopyClipBoard(openChat)} />}</div>
        </div>
      ) : (
        <></>
      )}
    </St.UserFeedbackBox>
  );
};

export default UserFeedback;
