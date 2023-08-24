import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getPartnerComments, getPartnerPostId, getWriterIds, updatePartnerComments } from '../../../api/supabase/partner';
import PartnerCommentList from './PartnerCommentList';
import PartnerCommentsWrite from './PartnerCommentsWrite';

const PartnerCommentsList = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['partnerComments'];
  // 여기서 데이터가져오는데 여기 쿼리키랑 다른곳 쿼리키(comment)랑 달라서..안된거였다.
  // useQuery당 하나의 쿼리인스턴스를 갖고있다. 여러개면 제일 최신key가 실행된다? 쿼리키랑 쿼리펑션 한쌍의 키
  const { isLoading: getIsLoading, isError: getIsError, data: allComments } = useQuery(['partnerComments'], getPartnerComments);

  const { isLoading: fixIsLoading, isError: fixIsError } = useMutation(updatePartnerComments, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
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
  // console.log('해당게시글의 댓글', filteredComments);

  const { data: writerId } = useQuery(['partnerCommentId'], getWriterIds);
  // 현재 로그인 한 유저의 ID
  // 얘때문에 안된거임.
  // const { isLoading, data: authId } = useQuery(['partnerAuthId'], getAuthId);

  // 현재 로그인한 유저의 댓글목록(writerId)
  const filteredIds = writerId?.filter((id) => {
    // return id.writerId === authId;
    return id.writerId === localStorage.getItem('authId');
  });
  // console.log('로그인한유저가작성한모든댓글', filteredIds);

  // 다른걸 리턴할 필요가 없으니까 그냥 이거자체를 리턴.
  if (getIsLoading || getIsError || fixIsLoading || fixIsError) {
    return <div>로딩 || 에러</div>;
  }

  return (
    <div>
      <p>댓글 {filteredComments?.length}개</p>
      <PartnerCommentsWrite />
      {/* filteredComments : 해당 게시글의 모든 댓글 */}
      {/* 지금은 fc만 있어도 실행되게 되어있다. fi 없어도.. */}
      {filteredComments &&
        filteredIds &&
        filteredComments.map((comment) => {
          // filteredIds : 로그인한 유저가 작성한 모든 댓글
          // id.writerId : 로그인한 유저가 작성한 댓글 돌면서 writerId 조회
          // comment.writerId : 해당 게시글의 모든 댓글 돌면서 writerId 조회
          const isLoginUser = localStorage.getItem('authId') === comment.writerId; // ���그인한 �
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
