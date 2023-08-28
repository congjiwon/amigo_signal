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
export const updatePartnerComment = async (updateComment: TPartnerUpdate) => {
  // 수정할 댓글 ID = updateComment.id
  const { data: updatedData, error } = await supabase.from('partnerComments').update(updateComment).eq('id', updateComment.id);
  console.log('error', error);
};

// 동행 답댓글 가져오기
export const getPartnerReComments = async () => {
  let { data: rePartnerComments, error } = await supabase.from('reComments').select('*').order('date', { ascending: true });
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

// 동행 답댓글 isUpdate 수정
export const updateIsUpdate = async (reCommentId: string, isOpen: boolean) => {
  const { error } = await supabase.from('reComments').update({ isUpdate: isOpen }).eq('id', reCommentId);
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

//동행 글 추가
export const insertPost = async (dataToInsert: any) => {
  const { data, error } = await supabase.from('partnerPosts').insert(dataToInsert);
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Inserted data:', data);
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

// 동행 답댓글 가져오기
export const getReCommentData = async () => {
  let { data: rePartnerComments, error } = await supabase.from('reComments').select('*, users!reComments_writerId_fkey(*)').order('date', { ascending: true });
  return rePartnerComments;
};

// 동행 글 가져오기
export const getPostData = async () => {
  let { data: partnerComments, error } = await supabase.from('partnerComments').select('*, users!comments_writerId_fkey(*)');
  return partnerComments;
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

// 내가 작성한 동행찾기 포스트 가져오기 (filterIsOpen 조건)
type MyPartnerPostProps = {
  userId: string | undefined;
  filterIsOpen?: boolean | null;
};

export const getMyPartnerPosts = async ({ userId, filterIsOpen }: MyPartnerPostProps) => {
  let partnerPosts = supabase.from('partnerPosts').select('*').eq('writerId', userId);

  if (filterIsOpen === null) {
    const { data: filteredPartnerPosts } = await partnerPosts;
    return filteredPartnerPosts;
  }

  if (filterIsOpen === true) {
    partnerPosts = partnerPosts.eq('isOpen', true);
  }
  if (filterIsOpen === false) {
    partnerPosts = partnerPosts.eq('isOpen', false);
  }

  const { data: filteredPartnerPosts } = await partnerPosts;
  return filteredPartnerPosts;
};

// 내가 지원한 포스트들
type AppliedPostProps = {
  userId: string | undefined;
  filterIsAccepted?: boolean | null;
};

export const getAppliedPosts = async ({ userId, filterIsAccepted }: AppliedPostProps) => {
  let appliedPosts = supabase.from('applicants').select('*, postId (*)').eq('applicantId', userId);

  if (filterIsAccepted === null) {
    appliedPosts = appliedPosts.is('isAccepted', null);
  }
  if (filterIsAccepted === true) {
    appliedPosts = appliedPosts.is('isAccepted', true);
  }
  if (filterIsAccepted === false) {
    appliedPosts = appliedPosts.is('isAccepted', false);
  }

  const { data: appliedPostsData } = await appliedPosts;
  return appliedPostsData;
};

//동행 메인 리스트 국가 + 기간별 필터... ㅇㅔ휴

type filteredPostProps = {
  country: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};

export const getFilteredPartnerPost = async ({ country, startDate, endDate }: filteredPostProps) => {
  let partnerPosts = supabase.from('partnerPosts').select('*, users!partnerPosts_writerId_fkey(*)');
  // let partnerPosts = supabase.from('partnerPosts').select('*');

  if (country == undefined) {
    partnerPosts = partnerPosts.gt('startDate', startDate).lt('endDate', endDate);
    const { data: test } = await partnerPosts;
    return test;
  }

  if (startDate == undefined || endDate == undefined) {
    partnerPosts = partnerPosts.eq('country', country);
    const { data: test } = await partnerPosts;
    return test;
  }

  if (typeof country == 'string' && typeof endDate == 'string' && typeof startDate == 'string') {
    partnerPosts = partnerPosts.eq('country', country).gt('startDate', startDate).lt('endDate', endDate);
    const { data: test } = await partnerPosts;
    return test;
  }
};

// 모집중 <-> 모집완료 바꾸는 로직
export const updatePostStatus = async (postId: string, isOpen: boolean) => {
  const { error } = await supabase.from('partnerPosts').update({ isOpen }).eq('id', postId).single();
  if (error) {
    console.error('모집 상태 업데이트 중 error 발생', error);
  }
};

// 해당 동행 모집 글의 모집 인원 가져오기
export const getNumOfPeople = async (postId: string) => {
  const { data } = await supabase.from('partnerPosts').select('numOfPeople').eq('id', postId);
  return data;
};
