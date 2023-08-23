import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { deletePartnerComments, getAuthId, getCommentId, getPartnerComments, getPartnerPostId, getUserId, getWriterId, updatePartnerComments } from './Partner';
import PartnerCommentsWrite from './PartnerCommentsWrite';

const PartnerCommentsList = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const [prevComment, setPrevComment] = useState('');
  const queryKey = ['partnerComments'];
  const { isLoading: getIsLoading, isError: getIsError, data: allComments } = useQuery(queryKey, getPartnerComments);

  const { isLoading: fixIsLoading, isError: fixIsError } = useMutation(updatePartnerComments, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const mutation = useMutation(deletePartnerComments, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(queryKey);
    },
  });

  const { data: partnerPostIdData } = useQuery(['partnerPostId'], getPartnerPostId);
  const findFilteredComments = partnerPostIdData?.filter((comment) => {
    return comment.id === params.postid; // postid,,,ㅠㅠ
  });

  // 왜 이렇게까지 써야하는거지?
  const filteredPostId = findFilteredComments && findFilteredComments[0] && findFilteredComments[0].id;
  const filteredComments = allComments?.filter((comment) => {
    return comment.postId === filteredPostId;
  });

  const { data: writerId } = useQuery(['partnerCommentId'], getWriterId);
  // 현재 로그인 한 유저의 ID
  const { isLoading, data: authId } = useQuery(['partnerAuthId'], getAuthId);

  // 현재 로그인한 유저의 댓글목록(writerId)
  const filteredId = writerId?.filter((id) => {
    return id.writerId === authId;
  });

  console.log('헐', filteredId);

  // 로그인 한 유저 정보 가져오기
  const { data: userId } = useQuery(['user'], getUserId);
  const { data: commentId } = useQuery(['comment'], getCommentId);
  const user = userId?.filter((user) => {
    return user.id === authId;
    // return commentId?.find((comment) => {
    //   comment.id == user.id;
    // })?.id;
  });
  console.log('user', user);

  // 다른걸 리턴할 필요가 없으니까 그냥 이거자체를 리턴.
  if (getIsLoading || getIsError || mutation.isLoading || mutation.isError || fixIsLoading || fixIsError) {
    return <div>그렇게 됐다.</div>;
  }

  const handleDelBtn = (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      mutation.mutate(id);
    }
  };

  // input은 계속 있어야하니까,
  // 변수로 상태값만 바꾸고 컴포넌트자체를 바꿀 필요는 없다.
  // const handleFixBtn = (comment: string) => {
  //   setPrevComment(comment);
  // };

  return (
    <div>
      <p>댓글 {filteredComments?.length}개</p>
      <PartnerCommentsWrite prevComment={prevComment} />
      {filteredComments?.map((comment) => {
        const isLoginUser = filteredId?.some((id) => id.writerId === comment.writerId);
        return (
          <div key={comment.id}>
            {isLoginUser && <Img src={user && user[0] && user[0].profileImageUrl!} />}
            {/* <p>{user && user[0] && user[0].nickName}</p> */}
            <div>
              <p>{comment.content}</p>
              <p>{comment.date}</p>
            </div>
            {isLoginUser && (
              <div>
                <button>수정</button>
                <button onClick={() => handleDelBtn(comment.id)}>삭제</button>
              </div>
            )}
            <button>답글달기</button>
          </div>
        );
      })}
    </div>
  );
};

export default PartnerCommentsList;

const Img = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50px;
`;
