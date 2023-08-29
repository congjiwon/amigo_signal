import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { getPartnerComments, getPartnerPostId, getReCommentData, getWriterIds, updatePartnerComment } from '../../../api/supabase/partner';
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
  // console.log('partnerPostIdData', partnerPostIdData);
  // 해당 게시글 ID 찾기(배열의 0번쨰)
  const findFilteredComments = partnerPostIdData?.filter((comment) => {
    // console.log('comment', comment.id); // 모든 동행 댓글 ID 중에서, 게시글 params랑 같은거,, 해당 게시글 postId
    return comment.id === params.postid; // postid,,,ㅠㅠ
  });
  // console.log('findFilteredComments', findFilteredComments);

  // 왜 이렇게까지 써야하는거지?
  const filteredPostId = findFilteredComments && findFilteredComments[0] && findFilteredComments[0].id;
  const filteredComments = allComments?.filter((comment) => {
    return comment.postId === filteredPostId;
  });

  const { data: reCommentsData } = useQuery(['partnerReComments'], getReCommentData);
  const [reCommentCount, setReCommentCount] = useState(0);
  useEffect(() => {
    // spotReComments 테이블에서 해당 게시글에 대한 답댓글 수 계산
    const reCommentCountForPost =
      reCommentsData?.filter((reComment) => {
        const parentComment = filteredComments?.find((comment) => comment.id === reComment.commentId);
        return parentComment;
      }).length || 0;

    setReCommentCount(reCommentCountForPost);
  }, [reCommentsData, filteredComments]);

  const commentsCount = (filteredComments?.length || 0) + reCommentCount;

  const { data: writerId } = useQuery(['partnerCommentId'], getWriterIds); // 안씀

  // 현재 로그인한 유저의 댓글목록(writerId) // 안씀
  const filteredIds = writerId?.filter((id) => {
    return id.writerId === localStorage.getItem('authId');
  });

  // 대박 얘 없으면 58번 props 내려주는 allComments 에러남!!!
  // 이거 없으면 allComments! 이렇게 써줘야함 대박
  if (getIsLoading || getIsError || fixIsLoading || fixIsError) {
    return <div>로딩 || 에러</div>;
  }

  return (
    <div>
      <CommentLengthBox>
        <CommentLengthParagraph>댓글 {commentsCount}개</CommentLengthParagraph>
      </CommentLengthBox>
      <PartnerCommentsWrite />
      {/* filteredComments : 해당 게시글 댓글 목록 */}
      {filteredComments &&
        // filteredIds : 현재 로그인한 유저의 댓글 목록
        // filteredIds &&
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
  /* margin-top: 31px; */
  margin-bottom: 10px;
  font-size: 14px;
`;
