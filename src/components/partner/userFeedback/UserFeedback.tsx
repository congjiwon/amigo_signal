import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../../api/supabase/users';
import useSessionStore from '../../zstand/store';
import useCopyClipBoard from '../../../hooks/useCopyClipBoard';
import * as St from './style';

interface Props {
  createdAt: string;
  writerId: string;
  openChat: string;
}

const UserFeedback = ({ createdAt, writerId, openChat }: Props) => {
  const navigate = useNavigate();

  const [, onCopy] = useCopyClipBoard();
  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const session = useSessionStore((state) => state.session);
  const logInUserId = session?.user.id;

  const { data: postUser, isLoading, isError } = useQuery(['partnerPost', writerId], () => getUser({ userId: writerId as string }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const { id, nickName, profileImageUrl } = postUser.data!;

  function isPostUser(): boolean {
    if (logInUserId === id) {
      return true;
    } else return false;
  }

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
          <button>삭제</button>
        </div>
      ) : (
        <div>{openChat.length > 1 && <button onClick={() => handleCopyClipBoard(openChat)}>오픈카톡</button>}</div>
      )}
    </St.UserFeedbackBox>
  );
};

export default UserFeedback;
