import { Inserts, TPartnerInsert, TPartnerReCommentsInsert, TPartnerUpdate } from './supabase';
import { supabase } from './supabaseClient';

export const getPartnerPosts = async () => {
  let { data: partnerPosts, error } = await supabase.from('partnerPosts').select('*, users!partnerPosts_writerId_fkey(*)');
  return { data: partnerPosts, error };
};

export const getPartnerPost = async ({ postId }: { postId: string }) => {
  let { data: partnerPosts } = await supabase.from('partnerPosts').select('*').eq('id', postId).single();
  return { data: partnerPosts };
};

export const deletePartnerPost = async ({ postId }: { postId: string }) => {
  const { error } = await supabase.from('partnerPosts').delete().eq('id', postId);
  console.log('deletePost', error);
};

// 동행 댓글 가져오기(정렬)
export const getPartnerComments = async () => {
  let { data: partnerComments, error } = await supabase.from('partnerComments').select('*').order('date', { ascending: false });
  // console.log('getPartnerComments');
  return partnerComments;
};

// 동행 댓글 작성
export const postPartnerComment = async (newPartnerComment: TPartnerInsert) => {
  const { error } = await supabase.from('partnerComments').insert(newPartnerComment);
  console.log('error', error);
};

// 동행 댓글 삭제
export const deletePartnerComment = async (commentId: string) => {
  const { error } = await supabase.from('partnerComments').delete().eq('id', commentId);
  console.log('error', error);
};

// 동행 답댓글 삭제
export const deletePartnerReComment = async (reCommentId: string) => {
  const { error } = await supabase.from('reComments').delete().eq('id', reCommentId);
  console.log('error', error);
};

// 동행 댓글 수정
export const updatePartnerComments = async (updateComment: TPartnerUpdate) => {
  // 수정할 댓글 ID = updateComment.id
  const { data: updatedData, error } = await supabase.from('partnerComments').update(updateComment).eq('id', updateComment.id);
  console.log('error', error);
};

// 동행 답댓글 가져오기
export const getPartnerReComments = async () => {
  let { data: rePartnerComments, error } = await supabase.from('reComments').select('*').order('date', { ascending: false });
  return rePartnerComments;
};

// 동행 답댓글 작성
export const postPartnerRecomment = async (newPartnerRecomment: TPartnerReCommentsInsert) => {
  const { error } = await supabase.from('reComments').insert(newPartnerRecomment);
};

// 동행 답댓글 commentId로 쓸 partnerComments.id 찾기
export const getFPartnerCommentId = async () => {
  let { data: reComments, error } = await supabase.from('reComments').select(`
  *,
  partnerComments (
    *
  )
`);
};

// 코멘트 ID 배열
export const getCommentIds = async () => {
  let { data: commentId } = await supabase.from('partnerComments').select('id');
  return commentId;
};

export const getCommentPostId = async () => {
  let { data: commentPostId, error } = await supabase.from('partnerComments').select('postId');
  return commentPostId;
};

export const getPartnerPostId = async () => {
  let { data: partnerPostId, error } = await supabase.from('partnerPosts').select('id');
  return partnerPostId;
};

// 코멘트 작성자 ID 배열
export const getWriterIds = async () => {
  let { data: writerId, error } = await supabase.from('partnerComments').select('writerId');
  // console.log('getWriterId');
  return writerId;
};

export const insertPost = async (dataToInsert: any) => {
  try {
    const { data, error } = await supabase.from('partnerPosts').insert(dataToInsert);
    if (error) {
      console.error('Insert error:', error);
    } else {
      console.log('Inserted data:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// 참여하기 (자기소개 모달에서 보내는 정보)
export const insertApplicant = async (applicantData: Inserts<'applicants'>) => {
  try {
    const { data, error } = await supabase.from('applicants').insert(applicantData);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('참여하기 정보 보내는 과정에서 오류 발생', error);
    throw error;
  }
};

// 참여 신청했는지 여부 check
export const checkApply = async (postId: string, logInUserId: string) => {
  if (!postId || !logInUserId) return;
  const { data, error } = await supabase.from('applicants').select('*').eq('postId', postId).eq('applicantId', logInUserId);
  if (error) {
    console.error('참가 여부를 확인하는 과정에서 error 발생', error);
    return;
  }
  return data;
};

// 참여 취소
export const deleteApplicant = async (postId: string, logInUserId: string) => {
  try {
    const { data, error } = await supabase.from('applicants').delete().eq('postId', postId).eq('applicantId', logInUserId);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('참여 취소 과정에서 error 발생', error);
    throw error;
  }
};

// 신청자 목록 가져오기
export const getApplicantList = async (postId: string) => {
  const { data: ApplicantList, error } = await supabase.from('applicants').select('*, users!applicants_applicantId_fkey(*)').eq('postId', postId);
  return { data: ApplicantList, error };
};
