import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { getPartnerComments, getPartnerPostId, getWriterIds, updatePartnerComment } from '../../../api/supabase/partner';
import PartnerCommentList from './PartnerCommentList';
import PartnerCommentsWrite from './PartnerCommentsWrite';

const PartnerCommentsList = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const queryKey = ['partnerComments'];
  // 여기서 데이터가져오는데 여기 쿼리키랑 다른곳 쿼리키(comment)랑 달라서..안된거였다.
  // useQuery당 하나의 쿼리인스턴스를 갖고있다. 여러개면 제일 최신key가 실행된다? 쿼리키랑 쿼리펑션 한쌍의 키
  const { isLoading: getIsLoading, isError: getIsError, data: allComments } = useQuery(['partnerComments'], getPartnerComments);

  const { isLoading: fixIsLoading, isError: fixIsError } = useMutation(updatePartnerComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  // 모든 동행 댓글 ID
  const { data: partnerPostIdData } = useQuery(['partnerPostId'], getPartnerPostId);
  const findFilteredComments = partnerPostIdData?.filter((comment) => {
    return comment.id === params.postid; // postid,,,ㅠㅠ
  });

  // 왜 이렇게까지 써야하는거지?
  const filteredPostId = findFilteredComments && findFilteredComments[0] && findFilteredComments[0].id;
  const filteredComments = allComments?.filter((comment) => {
    return comment.postId === filteredPostId;
  });

  const { data: writerId } = useQuery(['partnerCommentId'], getWriterIds);

  // 현재 로그인한 유저의 댓글목록(writerId)
  const filteredIds = writerId?.filter((id) => {
    return id.writerId === localStorage.getItem('authId');
  });

  if (getIsLoading || getIsError || fixIsLoading || fixIsError) {
    return <div>로딩 || 에러</div>;
  }

  return (
    <div>
      <CommentLengthBox>
        <CommentLengthParagraph>댓글 {filteredComments?.length}개</CommentLengthParagraph>
      </CommentLengthBox>
      <PartnerCommentsWrite />
      {filteredComments &&
        filteredIds &&
        filteredComments.map((comment) => {
          const isLoginUser = localStorage.getItem('authId') === comment.writerId;
          return <PartnerCommentList key={comment.id} allComments={allComments} comment={comment} isLoginUser={isLoginUser!} />;
        })}
    </div>
  );
};

export default PartnerCommentsList;

const CommentLengthBox = styled.div`
  /* width: 49px; */
  height: 21px;
`;

const CommentLengthParagraph = styled.p`
  font-size: 14px;
`;
