import { Inserts, TPartnerInsert, TPartnerReCommentsInsert, TPartnerReCommentsUpdate, TPartnerUpdate } from './supabase';
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

export const updatePartnerPost = async (updatePost: any) => {
  const { data: updatedData, error } = await supabase.from('partnerPosts').update(updatePost).eq('id', updatePost.id);
  console.log('updatePost', error);
};

// 댓글 작성
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

// 동행 답댓글 수정
export const updatePartnerReComment = async (updateReComment: TPartnerReCommentsUpdate) => {
  const { error } = await supabase.from('reComments').update(updateReComment).eq('id', updateReComment.id);
};

// 동행 답댓글 commentId로 쓸 partnerComments.id 찾기
export const getFUser = async () => {
  let { data: reComments, error } = await supabase.from('reComments').select(`
  writerId,
  users (
    id, profileImageUrl, nickName
  )`);
  // console.log('ㅎㅎ', reComments);
};
// getFUser();

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
  return writerId;
};

// 답댓글 작성자 ID 배열
export const getReCommentWriterIds = async () => {
  let { data: reCommentWriterId, error } = await supabase.from('reComments').select('writerId');
  return reCommentWriterId;
};

// 테스트
export const getUsers = async (userId: string) => {
  const { data, error } = await supabase
    .from('users') // 사용자 테이블 이름
    .select('id, nickName, profileImageUrl') // 가져올 필드 목록
    .eq('id', userId) // 필터 조건: id가 userId와 일치하는 경우
    .single(); // 단일 결과를 가져오기

  if (error) {
    throw error;
  }

  return data;
};

//동행 글 추가
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
  const { data: applicantList, error } = await supabase.from('applicants').select('*, users!applicants_applicantId_fkey(*)').eq('postId', postId).eq('isConfirmed', false);
  return { data: applicantList, error };
};

// 동행 답댓글 가져오기dfasfd
export const getTest = async () => {
  let { data: rePartnerComments, error } = await supabase.from('reComments').select('*, users!reComments_writerId_fkey(*)').order('date', { ascending: false });
  return rePartnerComments;
};

// 신청자 목록 -> 수락 / 거절
export const updateStatus = async (applicantId: string, isAccepted: boolean) => {
  const { data: updatedData, error } = await supabase.from('applicants').update({ isAccepted, isConfirmed: true }).eq('applicantId', applicantId);
  return { data: updatedData, error };
};

// 신청자 state(수락 / 거절) 정보 가져오기
export const getApplicantStatus = async (applicantId: string) => {
  const { data, error } = await supabase.from('applicants').select('isAccepted').eq('applicantId', applicantId).single();
  if (error) {
    console.error('신청자 참여 정보를 불러오는 과정에서 error', error);
    throw error;
  }
  return data;
};

// 참여 수락된 신청자 정보 가져오기
export const getConfirmedApplicantList = async (postId: string) => {
  const { data: applicantList, error } = await supabase.from('applicants').select('*, users!applicants_applicantId_fkey(*)').eq('postId', postId).eq('isAccepted', true);
  return { data: applicantList, error };
};
