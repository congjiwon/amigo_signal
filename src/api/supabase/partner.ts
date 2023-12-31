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

// 동행 목록: 3중 필터 (모집 여부 + 국가 + 여행 기간)
type PartnerFilterType = {
  isOpen?: boolean;
  country?: string;
  startDate?: string;
  endDate?: string;
};

export const getPartnerPosts = async ({ isOpen, country, startDate, endDate, page = 0, limit = 8 }: PartnerFilterType & { page?: number; limit?: number }) => {
  let PartnerPosts = supabase.from('partnerPosts').select('*, users(*), country(*)', { count: 'exact' }).order('createdAt', { ascending: false });

  if (isOpen !== undefined) {
    PartnerPosts = PartnerPosts.eq('isOpen', isOpen);
  }

  if (country !== undefined) {
    PartnerPosts = PartnerPosts.eq('country', country);
  }

  if (startDate !== undefined && endDate !== undefined) {
    PartnerPosts = PartnerPosts.gte('startDate', startDate).lte('endDate', endDate);
  }

  const { data, error, count } = await PartnerPosts.range(page * limit, (page + 1) * limit - 1);
  return { data, error, count, page };
};

export const getPartnerPost = async ({ postId }: { postId: string }) => {
  const { data, error } = await supabase.from('partnerPosts').select('*, country(country), users(nickName, profileImageUrl, birthday, gender)').eq('id', postId).single();
  if (error) {
    throw error;
  }
  return data;
};

export const deletePartnerPost = async ({ postId }: { postId: string }) => {
  const { error } = await supabase.from('partnerPosts').delete().eq('id', postId);
};

export const updatePartnerPost = async (updatePost: any) => {
  const { data, error } = await supabase.from('partnerPosts').update(updatePost).eq('id', updatePost.id);
};

// 동행 댓글 가져오기(정렬)
export const getPartnerComments = async () => {
  const { data, error } = await supabase.from('partnerComments').select('*').order('date', { ascending: false });
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
};

// 동행 댓글 삭제
export const deletePartnerComment = async (commentId: string) => {
  const { error } = await supabase.from('partnerComments').delete().eq('id', commentId);
};

// 동행 댓글 수정
export const updatePartnerComment = async (updateComment: TPartnerUpdate) => {
  // 수정할 댓글 ID = updateComment.id
  const { data, error } = await supabase.from('partnerComments').update(updateComment).eq('id', updateComment.id);
};

// 동행 답댓글 가져오기(답글 작성한 모든 유저도 같이)
export const getReCommentData = async () => {
  const { data, error } = await supabase.from('reComments').select('*, users(*)').order('date', { ascending: true });
  return data;
};

// 동행 답댓글 작성
export const postPartnerRecomment = async (newPartnerRecomment: TPartnerReCommentsInsert) => {
  const { error } = await supabase.from('reComments').insert(newPartnerRecomment);
};

// 동행 답댓글 삭제
export const deletePartnerReComment = async (reCommentId: string) => {
  const { error } = await supabase.from('reComments').delete().eq('id', reCommentId);
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
export const insertPost = async (dataToInsert: Inserts<'partnerPosts'>) => {
  const { data, error } = await supabase.from('partnerPosts').insert(dataToInsert).select();
  if (error) {
  } else {
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
    throw error;
  }
};

// 참여 신청했는지 여부 check
export const checkApply = async (postId: string, logInUserId: string) => {
  if (!postId || !logInUserId) return;
  const { data, error } = await supabase.from('applicants').select('*').eq('postId', postId).eq('applicantId', logInUserId);
  if (error) {
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
    throw error;
  }
};

// 신청자 목록 가져오기
export const getApplicantList = async (postId: string) => {
  const { data, error } = await supabase.from('applicants').select('*, users!applicants_applicantId_fkey(*)').eq('postId', postId).eq('isConfirmed', false);
  return { data, error };
};

// 신청자 목록 -> 수락 / 거절
export const updateStatus = async (applicantId: string, postId: string, isAccepted: boolean) => {
  const { data, error } = await supabase.from('applicants').update({ isAccepted, isConfirmed: true }).eq('applicantId', applicantId).eq('postId', postId);
  return { data, error };
};

// 모집완료 시 -> 신청 대기 목록에 있던 나머지 지원자의 지원 상태: 거절로 변경
export const makeRestApplicantStatusReject = async (postId: string) => {
  const { data } = await supabase.from('applicants').update({ isAccepted: false, isConfirmed: true }).eq('postId', postId).eq('isConfirmed', false);
  return { data };
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

  const { data, count } = await partnerPosts.order('createdAt', { ascending: false }).range(from, to);
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

// 모집중 <-> 모집완료 바꾸는 로직
export const updatePostStatus = async (postId: string, isOpen: boolean) => {
  const { error } = await supabase.from('partnerPosts').update({ isOpen }).eq('id', postId).single();
  if (error) {
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

// 헤더 alert에 담길 post 제목 가져오기
export const fetchPartnerPostTitle = async (postId: string) => {
  const { data } = await supabase.from('partnerPosts').select('title').eq('id', postId).single();
  return data?.title;
};

// 헤더 alert에 담길 user Nickname 가져오기
export const getUserNickName = async (applicantId: string) => {
  const { data } = await supabase.from('users').select('nickName').eq('id', applicantId).single();
  return data?.nickName;
};

//북마크 추가
export const addBookmark = async (bookMarkInsert: Inserts<'bookmarks'>) => {
  const { error } = await supabase.from('bookmarks').insert(bookMarkInsert).select();
  if (error) {
  }
};

//북마크 삭제
export const removeBookMark = async (logInUserId: string, postId: string) => {
  const { error } = await supabase.from('bookmarks').delete().eq('postId', postId).eq('userId', logInUserId);
  if (error) throw error;
};

//북마크 상태 확인
export const bookmarkCheck = async (logInUserId: string, postId: string) => {
  const { data, error } = await supabase.from('bookmarks').select('*').eq('postId', postId).eq('userId', logInUserId);
  return data;
};
