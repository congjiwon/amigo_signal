import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getCommentId, updatePartnerComments } from '../../../api/supabase/partner';
import { getAuthId } from '../../../api/supabase/users';
import { PartnerCommentListProps } from './PartnerComments';

function PartnerCommentList({ comment, filteredIds, isLoginUser, handleDelBtn }: PartnerCommentListProps) {
  // function PartnerCommentList(comment: PartnerCommentListProps['comment'], filteredIds: PartnerCommentListProps['filteredIds'], isLoginUser: PartnerCommentListProps['isLoginUser'], handleDelBtn: PartnerCommentListProps['handleDelBtn']): JSX.Element {
  // 구조분해할당하기 함수컴포넌트 props는 무조건 객체
  const params = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateComment, setUpdateComment] = useState('');
  const queryClient = useQueryClient();
  const { isLoading, data: authId } = useQuery(['authId'], getAuthId);
  const mutation = useMutation(updatePartnerComments, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['updatePartnerComment']);
      console.log('수정되는거니');
    },
  });

  const { data: commentId } = useQuery(['commentId'], getCommentId);
  console.log('이건데', commentId);

  const now = new Date();
  const Timestamptz = now.toISOString();

  const handleUpdateBtn = () => {
    setIsUpdate(true);
  };

  // 핸들러는 함수고 이벤트는 매개변수니까 handler 빼야된다.
  // 매개변수로 event객체를 받는다.
  const handleSubmitBtn = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('submit 1번');
    event.preventDefault();

    const newComment = {
      content: updateComment,
      date: Timestamptz,
      writerId: authId,
      postId: params.postid,
    };

    mutation.mutate(newComment);

    console.log('submit 2번');
    setIsUpdate(false);
  };

  {
    return (
      <div>
        {/* {isLoginUser && <Img src={user && user[0] && user[0].profileImageUrl!} />} */}
        {/* <p>{user && user[0] && user[0].nickName}</p> */}
        <div>
          {isUpdate && updateComment !== null ? <p>{updateComment}</p> : <p>{comment?.content}</p>}
          <p>{comment?.date}</p>
        </div>
        {isLoginUser && (
          <div>
            <button onClick={handleUpdateBtn}>수정</button>
            {isUpdate ? (
              <form onSubmit={handleSubmitBtn}>
                <input type="text" placeholder="댓글을 남겨보세요" value={updateComment} onChange={(event) => setUpdateComment(event.target.value)} />
                <button onClick={() => setIsUpdate(false)}>취소</button>
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
