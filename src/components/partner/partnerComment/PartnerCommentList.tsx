import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { deletePartnerComments, getCommentId, getWriterId, updatePartnerComments } from '../../../api/supabase/partner';
import { getAuthId, getUserIds, getUsers } from '../../../api/supabase/users';

type CommentProps = {
  content: string;
  date: string;
  id: string;
  postId: string | null;
  writerId: string;
};

export interface PartnerCommentListProps {
  comment: CommentProps | undefined;
  isLoginUser: boolean;
}

function PartnerCommentList({ comment, isLoginUser }: PartnerCommentListProps) {
  const params = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState('');
  const [commentIdToUpdate, setCommentIdToUpdate] = useState('');
  const queryClient = useQueryClient();
  const { isLoading, data: authId } = useQuery(['authId'], getAuthId);
  const mutation = useMutation(updatePartnerComments, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerComments']);
    },
  });

  // 매개변수로 event객체를 받는다.
  // 핸들러는 함수고 이벤트는 매개변수니까 handler 빼야된다.
  const handleSubmitBtn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      content: updateComment,
      // date: currentTime(), 수정시간넣으면 정렬 이상해짐.
      writerId: authId,
      postId: params.postid,
      id: comment?.id,
    };

    await mutation.mutate(newComment);

    setIsUpdate(false);
  };

  const handleUpdateBtn = (commentId: string) => {
    setIsUpdate(true);
    setCommentIdToUpdate(commentId);
  };

  const delMutation = useMutation(deletePartnerComments, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerComments']);
    },
  });

  const handleDelBtn = async (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await delMutation.mutateAsync(id);
    }
  };

  const { data: writerIds } = useQuery(['comment'], getWriterId);
  const { data: userIds } = useQuery(['user'], getUserIds);
  const filteredUserIds = userIds?.map((id) => id.id);

  // const handleOnkeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if(event.keyCode == 13) aaascript()
  // } onKeyDown={handleOnkeyDown}

  // 로그인 한 유저 정보 가져오기
  const { data: users } = useQuery(['user'], getUsers);
  const { data: commentId } = useQuery(['comment'], getCommentId);
  const user = users?.filter((user) => {
    return user.id === authId;
    // return commentId?.find((comment) => {
    //   comment.id == user.id;
    // })?.id;
  });

  {
    return (
      <div>
        {/* {<img src={user && user[0] && user[0].profileImageUrl!} />}
        <p>{userId && userId[0] && userId[0].nickName}</p> */}
        <div>
          <p>{comment?.content}</p>
          <p>{comment?.date.substring(0, 10) + ' ' + comment?.date.substring(11, 16)}</p>
        </div>
        {isLoginUser && (
          <div>
            <button onClick={() => handleUpdateBtn(comment!.id)}>수정</button>
            {isUpdate ? (
              <form onSubmit={handleSubmitBtn}>
                <input type="text" placeholder="댓글을 남겨보세요" value={updateComment} onChange={(event) => setUpdateComment(event.target.value)} />
                <button type="submit" onClick={() => setIsUpdate(false)}>
                  취소
                </button>
                <button type="submit">수정등록</button>
              </form>
            ) : (
              ''
            )}
            <button onClick={() => handleDelBtn(comment!.id)}>삭제</button>
          </div>
        )}
        <button>답글달기</button>
      </div>
    );
  }
}

export default PartnerCommentList;
