import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePartnerComment, deletePartnerReComment, postPartnerComment, postPartnerRecomment, updatePartnerComment, updatePartnerReComment } from '../api/supabase/partner';

export function usePartnerComments() {
  const queryClient = useQueryClient();

  // 댓글 작성
  const postCommentMutation = useMutation(postPartnerComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerComments']);
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation(updatePartnerComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerComments']);
    },
  });

  // 댓글 삭제
  const deleteCommentMutation = useMutation(deletePartnerComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerComments']);
    },
  });

  // 답댓글 작성
  const postReCommentMutation = useMutation(postPartnerRecomment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerReComments']);
    },
  });

  // 답댓글 수정
  const updateReCommentMutation = useMutation(updatePartnerReComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerReComments']);
    },
  });

  // 답댓글 삭제
  const deleteReCommentMutation = useMutation(deletePartnerReComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['partnerReComments']);
    },
  });

  return { postCommentMutation, updateCommentMutation, deleteCommentMutation, postReCommentMutation, updateReCommentMutation, deleteReCommentMutation };
}
