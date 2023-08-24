import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { deletePartnerComment, deletePartnerReComment, getPartnerReComments, getWriterIds, postPartnerRecomment, updatePartnerComments } from '../../../api/supabase/partner';
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
  const queryClient = useQueryClient();
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState('');
  const [isReComment, setIsReComment] = useState(false);
  const [reContent, setReContent] = useState('');
  const [commentIdToUpdate, setCommentIdToUpdate] = useState('');

  const { isLoading, data: authId } = useQuery(['authId'], getAuthId);
  // 댓글 수정
  const mutation = useMutation(updatePartnerComments, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerComments']);
    },
  });

  const { data: allReComments } = useQuery(['partnerReComments'], getPartnerReComments);

  // 답댓글 작성
  const reCommentMutation = useMutation(postPartnerRecomment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerReComments']);
      setReContent('');
      setIsReComment(false);
    },
  });

  // 지원님 시간 가져옴.
  const currentTime = function () {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
    const now = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return now;
  };

  // 매개변수로 event객체를 받는다.
  // 핸들러는 함수고 이벤트는 매개변수니까 handler 빼야된다.
  // 댓글 수정 submit
  const handleSubmitBtn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newComment = {
      content: updateComment,
      // date: currentTime(), 수정시간넣으면 정렬 이상해짐.
      writerId: comment?.writerId,
      postId: comment?.postId!,
      id: comment?.id,
    };

    await mutation.mutateAsync(newComment);

    setIsUpdate(false);
  };

  // 답댓글 submit
  const handleReCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reComment = {
      reContent: reContent,
      date: currentTime(),
      writerId: comment!.writerId,
      commentId: comment!.id,
    };

    reCommentMutation.mutateAsync(reComment);
  };

  const handleUpdateBtn = (commentId: string) => {
    setIsUpdate(true);
    setCommentIdToUpdate(commentId);
  };

  // 댓글 삭제
  const delMutation = useMutation(deletePartnerComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerComments']);
    },
  });

  // 답댓글 삭제
  const delReMutation = useMutation(deletePartnerReComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerReComment']);
    },
  });

  // 답댓글 삭제 버튼 클릭
  const handleReDelBtn = async (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await delReMutation.mutateAsync(id);
    }
  };

  const handleDelBtn = async (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      await delMutation.mutateAsync(id);
    }
  };

  const { data: writerIds } = useQuery(['comment'], getWriterIds);
  const { data: userIds } = useQuery(['user'], getUserIds);
  const filteredUserIds = userIds?.map((id) => id.id);

  // 유저 ID, 닉네임, 프로필사진 배열
  const { data: users } = useQuery(['userData'], getUsers);
  // 댓글 작성자 ID 배열
  const { data: writerId } = useQuery(['writerId'], getWriterIds);
  // 댓글 작성자의 유저 ID, 닉네임, 프로필사진 배열
  const user = users?.filter((user) => {
    return writerId?.filter((id) => {
      return user.id === id.writerId;
    });
  });

  const handleRecommentBtn = () => {
    setIsReComment(true);
  };

  {
    return (
      <div>
        <div>
          {user?.map((n) => {
            if (n.id === comment?.writerId) {
              return (
                <div key={n.id}>
                  <img style={{ width: '40px', height: '40px', borderRadius: '50px' }} src={n && n.profileImageUrl!} />
                  <p>{n.nickName}</p>
                </div>
              );
            }
          })}
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
        <div>
          <button onClick={handleRecommentBtn}>답글쓰기</button>
          {isReComment ? (
            <form onSubmit={handleReCommentSubmit}>
              <input type="text" placeholder="댓글을 입력하세요" value={reContent} onChange={(event) => setReContent(event?.target.value)} />
              <button onClick={() => setIsReComment(false)}>취소</button>
              <button type="submit">등록</button>
            </form>
          ) : (
            ''
          )}
        </div>
        <div>
          {/* {comment?.id === 수파베이스에서 fk로 불러온 배열의 partnerComments배열 속 id랑 같으면} */}
          {allReComments?.map((reComment) => {
            if (reComment.commentId === comment?.id) {
              return (
                <div key={reComment.id}>
                  <p>{reComment.reContent}</p>
                  <button onClick={() => handleReDelBtn(reComment.id)}>삭제</button>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default PartnerCommentList;
