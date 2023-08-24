import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { deletePartnerComments, getPartnerComments, getPartnerPostId, getWriterId, updatePartnerComments } from '../../../api/supabase/partner';
import { getAuthId, getUsers } from '../../../api/supabase/users';
import PartnerCommentList from './PartnerCommentList';
import PartnerCommentsWrite from './PartnerCommentsWrite';

const PartnerCommentsList = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['partnerComments'];
  // 여기서 데이터가져오는데 여기 쿼리키랑 다른곳 쿼리키(comment)랑 달라서..안된거였다.
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
  const filteredIds = writerId?.filter((id) => {
    return id.writerId === authId;
  });

  // 로그인 한 유저 정보 가져오기
  const { data: userId } = useQuery(['user'], getUsers);
  const user = userId?.filter((user) => {
    return user.id === authId;
    // return commentId?.find((comment) => {
    //   comment.id == user.id;
    // })?.id;
  });

  // 다른걸 리턴할 필요가 없으니까 그냥 이거자체를 리턴.
  if (getIsLoading || getIsError || mutation.isLoading || mutation.isError || fixIsLoading || fixIsError) {
    return <div>로딩 || 에러</div>;
  }

  return (
    <div>
      <p>댓글 {filteredComments?.length}개</p>
      <PartnerCommentsWrite />
      {filteredComments?.map((comment) => {
        const isLoginUser = filteredIds?.some((id) => id.writerId === comment.writerId);
        return <PartnerCommentList key={comment.id} comment={comment} isLoginUser={isLoginUser!} />;
      })}
    </div>
  );
};

export default PartnerCommentsList;

{
  /*  컴포넌트로 빼고 id값으로 데이터 받아올 수 있게 수정해야한다. 
      오 컴포넌트로 빼니까 해당 댓글만 value값에 맞게 바뀜 신기하넹~
  */
}
// <PartnerCommentsList filteredComments={filteredComments} filteredIds={filteredIds} handleDelBtn={handleDelBtn} />
{
  /* <PartnerCommentsList {...filteredComments} {...filteredIds} {...handleDelBtn} /> */
}
const Img = styled.img`
  width: 40px;
  height: 40px;

  border-radius: 50px;
`;