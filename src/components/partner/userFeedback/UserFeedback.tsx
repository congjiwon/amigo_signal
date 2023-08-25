import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../../api/supabase/users';
import { deletePartnerPost } from '../../../api/supabase/partner';
import useSessionStore from '../../../zustand/store';
import useCopyClipBoard from '../../../hooks/useCopyClipBoard';
import { ConfirmDelete } from '../../common/modal/alert';
import * as St from './style';

interface Props {
  id: string;
  createdAt: string;
  writerId: string;
  openChat: string;
}

const UserFeedback = ({ id, createdAt, writerId, openChat }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [, onCopy] = useCopyClipBoard();
  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
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
          <button onClick={() => navigate(`/partner/write/${id}`)}>수정</button>
          <button onClick={() => handleDelBtn(id)}>삭제</button>
        </div>
      ) : (
        <div>{openChat.length > 1 && <button onClick={() => handleCopyClipBoard(openChat)}>오픈카톡</button>}</div>
      )}
    </St.UserFeedbackBox>
  );
};

export default UserFeedback;
