import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../../api/supabase/users';
import { deletePartnerPost } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import useCopyClipBoard from '../../../hooks/useCopyClipBoard';
import { ConfirmDelete } from '../../common/modal/alert';
import { FiMessageSquare } from 'react-icons/fi';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';
import * as St from './style';
import { useState } from 'react';

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

  const [, onCopy] = useCopyClipBoard();
  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;
  console.log('로그인한 사람인가요,,', logInUserId, '이건 writerId', writerId, '이건 글id', id);
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

  const handleDelBtn = async (id: string) => {
    const isConfirmed = await ConfirmDelete('해당 동행 글이 삭제되었습니다.');
    if (!isConfirmed) {
      return;
    }
    try {
      mutation.mutate({ postId: id });
      navigate('/partner');
    } catch (error) {
      // error 시 로직
    }
  };

  // 북마크 로직
  // 로그인한 사람이 북마크를 클릭하면 => 북마크 테이블에 로그인 한 유저 id, 게시글 id 넣어주고, 마커표시 true로 주기(북마크 체크표시 => useEffect)
  // 북마크 해제하면 => 북마크 테이블에서 행 삭제
  // 로그인 안 한 사람 => 북마크 아예 안보이게 or 클릭시 회원가입으로 이동하게
  // const [bookMark, setBookMark] = useState(false);
  const addBookMarkHandle = () => {
    setBookMark(!bookMark);
  };

  const removeBookMarkHandle = () => {
    setBookMark(!bookMark);
  };

  return (
    <St.UserFeedbackBox>
      <St.UserProfileBox>
        <St.UserProfileImgBox>
          <St.UserProfileImg src={profileImageUrl!} alt="Image" />
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
          <button onClick={() => navigate('/partner/write')}>수정</button>
          <button onClick={() => handleDelBtn(id)}>삭제</button>
        </div>
      ) : (
        <>
          <div>{bookMark ? <RiBookmarkFill onClick={() => addBookMarkHandle()} /> : <RiBookmarkLine onClick={() => removeBookMarkHandle()} />}</div>
          <div>{openChat.length > 1 && <FiMessageSquare onClick={() => handleCopyClipBoard(openChat)} />}</div>
        </>
      )}
    </St.UserFeedbackBox>
  );
};

export default UserFeedback;
