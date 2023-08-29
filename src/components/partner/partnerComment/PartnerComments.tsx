import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPartnerComments, getPartnerPostId, getReCommentData, getWriterIds } from '../../../api/supabase/partner';
import PartnerCommentList from './PartnerCommentList';
import PartnerCommentsWrite from './PartnerCommentsWrite';
import * as St from './style';

const PartnerCommentsList = () => {
  const params = useParams();
  const { data: allComments } = useQuery(['partnerComments'], getPartnerComments);

  // 모든 동행 댓글 ID
  const { data: partnerPostIdData } = useQuery(['partnerPostId'], getPartnerPostId);
  // 해당 게시글 ID 찾기(배열의 0번쨰)
  const findFilteredComments = partnerPostIdData?.filter((comment) => {
    // 모든 동행 댓글 ID 중에서, 게시글 params랑 같은거,, 해당 게시글 postId
    return comment.id === params.postid; // postid,,,ㅠㅠ
  });

  // 왜 이렇게까지 써야하는거지?
  const filteredPostId = findFilteredComments?.[0]?.id;
  // 해당 게시글 댓글 목록
  const filteredComments = allComments?.filter((comment) => {
    return comment.postId === filteredPostId;
  });

  const { data: reCommentsData } = useQuery(['partnerReComments'], getReCommentData);
  const [reCommentCount, setReCommentCount] = useState(0);
  useEffect(() => {
    // partnerReComments 테이블에서 해당 게시글에 대한 답댓글 수 계산
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

  return (
    <div>
      <St.CommentLengthBox>
        <St.CommentLengthParagraph>댓글 {commentsCount}개</St.CommentLengthParagraph>
      </St.CommentLengthBox>
      <PartnerCommentsWrite />
      {/* filteredComments : 해당 게시글 댓글 목록 */}
      {
        // filteredIds : 현재 로그인한 유저의 댓글 목록
        // filteredIds &&
        filteredComments?.map((comment) => {
          const isLoginUser = localStorage.getItem('authId') === comment.writerId;
          return <PartnerCommentList key={comment.id} allComments={allComments} comment={comment} isLoginUser={isLoginUser!} />;
        })
      }
    </div>
  );
};

export default PartnerCommentsList;
