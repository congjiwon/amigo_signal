import { NUMBER_OF_ITEMS, getRangePagination } from '../../components/common/getRangePagination/getRangePagination';
import { Inserts, TPartnerInsert, TPartnerReCommentsInsert, TPartnerReCommentsUpdate, TPartnerUpdate } from './supabase';
import { supabase } from './supabaseClient';

// 깃발가져오기
export const getFlag = async (country: string) => {
  return await supabase.from('countryInfo').select('flagUrl').eq('country', country);
};

export const getSpotShareDefaultImg = async (country: string) => {
  return await supabase.from('countryInfo').select('imageUrl').eq('country', country);
};

export const getPartnerPost = async ({ postId }: { postId: string }) => {
  const { data } = await supabase.from('partnerPosts').select('*, country(country)').eq('id', postId).single();
  return data;
};

export const deletePartnerPost = async ({ postId }: { postId: string }) => {
  const { error } = await supabase.from('partnerPosts').delete().eq('id', postId);
  console.log('deletePost', error);
};

export const updatePartnerPost = async (updatePost: any) => {
  const { data, error } = await supabase.from('partnerPosts').update(updatePost).eq('id', updatePost.id);
  console.log('updatePost', error);
};

// 동행 댓글 가져오기(정렬)
export const getPartnerComments = async () => {
  const { data, error } = await supabase.from('partnerComments').select('*').order('date', { ascending: false });
  // console.log('getPartnerComments');
  return data;
};

// 동행 댓글(댓글 작성한 모든 유저도 같이) 안씀.
export const getPostData = async () => {
  const { data, error } = await supabase.from('partnerComments').select('*, users!comments_writerId_fkey(*)');
  return data;
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

// 동행 댓글 수정
export const updatePartnerComment = async (updateComment: TPartnerUpdate) => {
  // 수정할 댓글 ID = updateComment.id
  const { data, error } = await supabase.from('partnerComments').update(updateComment).eq('id', updateComment.id);
  console.log('error', error);
};

// 동행 답댓글 가져오기(답글 작성한 모든 유저도 같이)
export const getReCommentData = async () => {
  const { data, error } = await supabase.from('reComments').select('*, users!reComments_writerId_fkey(*)').order('date', { ascending: true });
  return data;
};

// 동행 답댓글 작성
export const postPartnerRecomment = async (newPartnerRecomment: TPartnerReCommentsInsert) => {
  const { error } = await supabase.from('reComments').insert(newPartnerRecomment);
};

// 동행 답댓글 삭제
export const deletePartnerReComment = async (reCommentId: string) => {
  const { error } = await supabase.from('reComments').delete().eq('id', reCommentId);
  console.log('error', error);
};

// 동행 답댓글 수정
export const updatePartnerReComment = async (updateReComment: TPartnerReCommentsUpdate) => {
  const { error } = await supabase.from('reComments').update(updateReComment).eq('id', updateReComment.id);
};

// 포스트 작성자 ID
export const getPartnerPostId = async () => {
  const { data, error } = await supabase.from('partnerPosts').select('id');
  return data;
};

// 코멘트 작성자 ID 배열
export const getWriterIds = async () => {
  const { data, error } = await supabase.from('partnerComments').select('writerId');
  return data;
};

// 답댓글 작성자 ID 배열
export const getReCommentWriterIds = async () => {
  const { data, error } = await supabase.from('reComments').select('writerId');
  return data;
};

//동행 글 추가
// export const insertPost = async (dataToInsert: any) => {
export const insertPost = async (dataToInsert: Inserts<'partnerPosts'>) => {
  const { data, error } = await supabase.from('partnerPosts').insert(dataToInsert).select();
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Inserted data:', data);
    return data;
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
  const { data, error } = await supabase.from('applicants').select('*, users!applicants_applicantId_fkey(*)').eq('postId', postId).eq('isConfirmed', false);
  return { data, error };
};

// 신청자 목록 -> 수락 / 거절
export const updateStatus = async (applicantId: string, isAccepted: boolean) => {
  const { data, error } = await supabase.from('applicants').update({ isAccepted, isConfirmed: true }).eq('applicantId', applicantId);

  return { data, error };
};

// 참여 수락된 신청자 정보 가져오기
export const getConfirmedApplicantList = async (postId: string) => {
  const { data, error } = await supabase.from('applicants').select('*, users!applicants_applicantId_fkey(*)').eq('postId', postId).eq('isAccepted', true);
  return { data, error };
};

// 내가 작성한 동행찾기 포스트 가져오기 (filterIsOpen 조건)
type MyPartnerPostProps = {
  userId: string | undefined;
  filterIsOpen?: boolean | null;
  page: number;
};

export const getMyPartnerPosts = async ({ userId, filterIsOpen, page }: MyPartnerPostProps) => {
  const { from, to } = getRangePagination(page, NUMBER_OF_ITEMS);

  let partnerPosts = supabase.from('partnerPosts').select('*, country(country, flagUrl)', { count: 'exact' }).eq('writerId', userId);

  if (filterIsOpen === null) {
    partnerPosts = partnerPosts;
  }

  if (filterIsOpen === true) {
    partnerPosts = partnerPosts.is('isOpen', true);
  }
  if (filterIsOpen === false) {
    partnerPosts = partnerPosts.is('isOpen', false);
  }

  const { data, count } = await partnerPosts.order('startDate', { ascending: true }).range(from, to);
  return { data, count };
};

// 내가 지원한 동행 포스트들
type AppliedPostProps = {
  userId: string | undefined;
  filterIsAccepted?: boolean | null;
  page: number;
};

export const getAppliedPosts = async ({ userId, filterIsAccepted, page }: AppliedPostProps) => {
  const { from, to } = getRangePagination(page, NUMBER_OF_ITEMS);

  let appliedPosts = supabase.from('applicants').select('*, postId(*, writerId(*), country(country, flagUrl))', { count: 'exact' }).eq('applicantId', userId);

  if (filterIsAccepted === null) {
    appliedPosts = appliedPosts.is('isAccepted', null);
  }
  if (filterIsAccepted === true) {
    appliedPosts = appliedPosts.is('isAccepted', true);
  }
  if (filterIsAccepted === false) {
    appliedPosts = appliedPosts.is('isAccepted', false);
  }

  const { data, count } = await appliedPosts.order('postId(startDate)', { ascending: true }).range(from, to);
  return { data, count };
};

// 북마크한 포스트들
type BookmarkedPostProps = {
  userId: string | undefined;
  page: number;
};
export const getBookmarkedPosts = async ({ userId, page }: BookmarkedPostProps) => {
  const { from, to } = getRangePagination(page, NUMBER_OF_ITEMS);

  const { data, count } = await supabase.from('bookmarks').select('*, postId (*, country(country, flagUrl), writerId(*))', { count: 'exact' }).eq('userId', userId).order('postId(startDate)').range(from, to);

  return { data, count };
};

// 동행 메인 리스트 국가 + 기간별 + 모집여부 필터
type filteredPostProps = {
  country?: string;
  startDate?: string;
  endDate?: string;
  isOpen?: boolean;
};

export const getFilteredPartnerPost = async ({ country, startDate, endDate, isOpen }: filteredPostProps) => {
  let partnerPosts = supabase.from('partnerPosts').select('*, users(*), country(country, flagUrl)').order('createdAt', { ascending: false });
  if (isOpen !== undefined) {
    partnerPosts = partnerPosts.eq('isOpen', isOpen);
  }

  if (country !== undefined) {
    partnerPosts = partnerPosts.eq('country', country);
  }

  if (startDate !== undefined && endDate !== undefined) {
    partnerPosts = partnerPosts.gte('startDate', startDate).lte('endDate', endDate);
  }

  const { data, error } = await partnerPosts;
  if (error) {
    return null;
  }
  return data;
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

// 해당 동행 모집글의 모집 상태 여부만 가져오기
export const isPostOpen = async (postId: string): Promise<{ data: { isOpen: boolean } | null }> => {
  const { data } = await supabase.from('partnerPosts').select('isOpen').eq('id', postId).single();
  return { data };
};
