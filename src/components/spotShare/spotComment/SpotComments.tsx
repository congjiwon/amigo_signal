import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { styled } from 'styled-components';
import { getPostWriterId, getReCommentData, getSpotComments } from '../../../api/supabase/spotComments';
import SpotCommentList from './SpotCommentList';
import SpotWrite from './SpotWrite';

function SpotComments() {
  const { postid } = useParams<string>();
  const queryClient = useQueryClient();

  // 모든 댓글(유저정보 포함)
  const { data: allComments } = useQuery(['spotComments'], getSpotComments);

  // 모든 스팟 게시글 작성자 ID
  const { data: spotPostWriterId } = useQuery(['spotPostId'], getPostWriterId);
  // 작성자가 작성한 댓글 찾기(배열의 0번째.id)
  const findCommentId = spotPostWriterId?.filter((comment) => {
    return comment.id === postid;
  });
  const filteredPostId = findCommentId && findCommentId[0] && findCommentId[0].id;
  // 모든 댓글 중 해당 게시글의 댓글 배열
  const filteredComments = allComments?.filter((comment) => {
    // 얘의 갯수랑,,
    return comment.postId === filteredPostId;
  });

  const [reCommentCount, setReCommentCount] = useState(0);
  const { data: reCommentsData } = useQuery(['spotReComments'], getReCommentData);
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

  // const spotReCommentsData = getReCommentData(); // getReCommentData 함수가 필요한 모듈로 변경하세요
  // const adf = console.log('adf', spotReCommentsData);
  // const spotReCommentsCount = spotReCommentsData.filter(reComment => {
  //   const parentComment = spotCommentsData.find(comment => comment.id === reComment.commentId);
  //   return parentComment && parentComment.postId === postId;
  // }).length;

  return (
    <>
      <CommentLengthBox>
        <CommentLengthParagraph>댓글 {commentsCount}개</CommentLengthParagraph>
      </CommentLengthBox>
      <SpotWrite />
      {filteredComments &&
        // filteredIds : 현재 로그인한 유저의 댓글 목록
        // filteredIds &&
        filteredComments.map((comment) => {
          const isLoginUser = localStorage.getItem('authId') === comment.writerId;
          return <SpotCommentList key={comment.id} allComments={allComments} comment={comment} isLoginUser={isLoginUser!} />;
        })}
    </>
  );
}

export default SpotComments;

const CommentLengthBox = styled.div`
  /* width: 49px; */
  height: 21px;
`;

const CommentLengthParagraph = styled.p`
  /* margin-top: 31px; */
  margin-bottom: 10px;
  font-size: 14px;
`;
