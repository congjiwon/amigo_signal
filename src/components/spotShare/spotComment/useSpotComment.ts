import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSpotComment, deleteSpotReComment, postSpotComment, postSpotReComment, updateSpotComment, updateSpotReComment } from '../../../api/supabase/spotshare';

function useSpotComment() {
  const queryClient = useQueryClient();

  // 댓글 작성
  const postCommentMutation = useMutation(postSpotComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotComments']);
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation(updateSpotComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotComments']);
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation(deleteSpotComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotComments']);
    },
  });

  // 답댓글 작성
  const postReCommentMutation = useMutation(postSpotReComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotReComments']);
    },
  });

  // 답댓글 수정
  const updateReCommentMutation = useMutation(updateSpotReComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotReComments']);
    },
  });

  // 답댓글 삭제
  const deleteReCommentMutation = useMutation(deleteSpotReComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['spotReComments']);
    },
  });

  return { postCommentMutation, updateCommentMutation, deleteCommentMutation, postReCommentMutation, updateReCommentMutation, deleteReCommentMutation };
}

export default useSpotComment;
