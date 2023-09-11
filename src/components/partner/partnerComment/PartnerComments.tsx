import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPartnerComments, getPartnerPostId, getReCommentData } from '../../../api/supabase/partner';
import { getUsers } from '../../../api/supabase/users';
import PartnerCommentList from './comment/PartnerCommentList';
import PartnerCommentsWrite from './comment/PartnerCommentsWrite';
import * as St from './style';

const PartnerComments = () => {
  const params = useParams();
  const { data: users } = useQuery(['userData'], getUsers);
  const { data: allComments } = useQuery(['partnerComments'], getPartnerComments);

  const { data: partnerPostIdData } = useQuery(['partnerPostId'], getPartnerPostId);
  const findFilteredComments = partnerPostIdData?.find((comment) => {
    return comment.id === params.postid;
  });

  const filteredPostId = findFilteredComments?.id;
  const filteredComments = allComments?.filter((comment) => {
    return comment.postId === filteredPostId;
  });

  const { data: reCommentsData } = useQuery(['partnerReComments'], getReCommentData);
  const [reCommentCount, setReCommentCount] = useState(0);
  useEffect(() => {
    const reCommentCountForPost =
      reCommentsData?.filter((reComment) => {
        const parentComment = filteredComments?.find((comment) => comment.id === reComment.commentId);
        return parentComment;
      }).length || 0;

    setReCommentCount(reCommentCountForPost);
  }, [reCommentsData, filteredComments]);

  const commentsCount = (filteredComments?.length || 0) + reCommentCount;

  return (
    <div>
      <St.CommentLengthBox>
        <St.CommentLengthParagraph>댓글 {commentsCount}개</St.CommentLengthParagraph>
      </St.CommentLengthBox>
      <PartnerCommentsWrite />
      {filteredComments?.map((comment) => {
        const isLoginUser = localStorage.getItem('authId') === comment.writerId;
        return <PartnerCommentList key={comment.id} allComments={allComments} comment={comment} isLoginUser={isLoginUser!} users={users} allReCommentsData={reCommentsData} />;
      })}
    </div>
  );
};

export default PartnerComments;
