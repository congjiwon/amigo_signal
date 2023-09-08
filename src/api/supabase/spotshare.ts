import { NUMBER_OF_ITEMS, getRangePagination } from '../../components/common/getRangePagination/getRangePagination';
import { Inserts, Update } from './supabase';
import { supabase } from './supabaseClient';

//스팟 필터링
type filteredPostProps = {
  sort?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
};

export const getFilteredSpotSharePost = async ({ sort = 'createdAt', country, startDate, endDate, page = 0, limit = 4 }: filteredPostProps & { page?: number; limit?: number }) => {
  let sharePosts = supabase.from('spotPosts').select('*, users(*), country(imageUrl, country), likes(postId)').order(`${sort}`, { ascending: false });

  if (country !== undefined) {
    sharePosts = sharePosts.eq('country', country);
  }

  if (startDate !== undefined && endDate !== undefined) {
    sharePosts = sharePosts.gte('visitDate', startDate).lte('visitDate', endDate);
  }

  const { data, error, count } = await sharePosts.range(page * limit, (page + 1) * limit - 1);
  return { data, error, count, page };
};

// 클릭한 게시글 id?
export const getSpotPost = async ({ postId }: { postId: string }) => {
  const { data } = await supabase.from('spotPosts').select('*').eq('id', postId).single();
  return data;
};

export const updateSpotPost = async (updateData: Update<'spotPosts'>) => {
  const { error } = await supabase.from('spotPosts').update(updateData).eq('id', updateData.id).single();
};

// 스팟 댓글 가져오기(댓글 작성한 모든 유저 정보도 함께)
export const getSpotComments = async () => {
  const { data, error } = await supabase.from('spotComments').select('*, users(*), spotPosts(*)').order('date', { ascending: false });
  return data;
};

// 스팟 댓글 작성
export const postSpotComment = async (newSpotComment: Inserts<'spotComments'>) => {
  const { error } = await supabase.from('spotComments').insert(newSpotComment);
};

// 스팟 댓글 삭제
export const deleteSpotComment = async (commentId: string) => {
  const { error } = await supabase.from('spotComments').delete().eq('id', commentId);
};

// 스팟 댓글 수정
export const updateSpotComment = async (updateComment: Update<'spotComments'>) => {
  const { error } = await supabase.from('spotComments').update(updateComment).eq('id', updateComment.id);
};

// 스팟글 작성자 ID 배열인데 이것도 포스트작성자 찾는게 있었떤거같기도
export const getPostWriterId = async () => {
  const { data } = await supabase.from('spotPosts').select('id');
  return data;
};

// 스팟 답댓글 가져오기(답글 작성한 모든 유저도 같이)
export const getReCommentData = async () => {
  const { data } = await supabase.from('spotReComments').select('*, users(*)').order('date', { ascending: true });
  return data;
};

// 스팟 답댓글 작성
export const postSpotReComment = async (newSpotReComment: Inserts<'spotReComments'>) => {
  const { error } = await supabase.from('spotReComments').insert(newSpotReComment);
};

// 스팟 답댓글 삭제
export const deleteSpotReComment = async (reCommentId: string) => {
  const { error } = await supabase.from('spotReComments').delete().eq('id', reCommentId);
};

// 스팟 답댓글 수정
export const updateSpotReComment = async (updateReComment: Update<'spotReComments'>) => {
  const { error } = await supabase.from('spotReComments').update(updateReComment).eq('id', updateReComment.id);
};

//스팟공유 특정 글 가져오기
export const getDetailSpotSharePost = async (postId: string | undefined) => {
  const { data } = await supabase.from('spotPosts').select('*, users(*), country(country)').eq('id', postId).single();
  return data;
};

//스팟공유 게시글 삭제
export const deleteSpotSharePost = async (postId: string | undefined) => {
  const { error } = await supabase.from('spotPosts').delete().eq('id', postId);
  console.log('글 삭제 에러', error);
};

//스팟공유 게시글 작성하기
export const insertSpotPost = async (spotPostData: Inserts<'spotPosts'>) => {
  const { data, error } = await supabase.from('spotPosts').insert(spotPostData).select();
  if (error) {
    console.log(error);
  }
  return data;
};

type likes = { id?: string | undefined; postId: string; userId: string };

// 좋아요 추가
export const postLike = async (likes: likes) => {
  return await supabase.from('likes').insert(likes);
};

// 좋아요 삭제
export const deleteLike = async (postId: string, userId: string) => {
  return await supabase.from('likes').delete().eq('postId', postId).eq('userId', userId);
};

// 좋아요 카운트
export const countLikes = async (postId: string) => {
  return await supabase.from('likes').select('postId', { count: 'exact' }).eq('postId', postId);
};

// 스팟공유 게시글 좋아요 수 업데이트
export const countLike = async (like: number, postId: string) => {
  const { data } = await supabase.from('spotPosts').update({ likeCount: like }).eq('id', postId);
  return { data };
};

// 좋아요 가져오기
export const getLikes = async () => {
  const { data } = await supabase.from('likes').select('*, postId(*)');
  return { data };
};

export const getLikesCondition = async (logInUserId: string, postid: string) => {
  let { data, error } = await supabase.from('likes').select('*').eq('userId', logInUserId).eq('postId', postid);
  if (error) {
    console.log('좋아요 데이터 불러오기 실패', error);
  }
  return data;
};

// 내가 작성한 스팟공유 글 가져오기
type mySpotSharePostsType = {
  writerId: string | undefined;
  page: number;
};
export const getMySpotSharePosts = async ({ writerId, page }: mySpotSharePostsType) => {
  const { from, to } = getRangePagination(page, NUMBER_OF_ITEMS);

  const { data, count } = await supabase.from('spotPosts').select('*, country(*)', { count: 'exact' }).eq('writerId', writerId).order('visitDate', { ascending: false }).range(from, to);
  return { data, count };
};

// 좋아요한 포스트들
type LikedSpotShareProps = {
  userId: string | undefined;
  page: number;
};
export const getLikedSpotShare = async ({ userId, page }: LikedSpotShareProps) => {
  const { from, to } = getRangePagination(page, NUMBER_OF_ITEMS);

  const { data, count } = await supabase.from('likes').select('*, postId (*, country(country, imageUrl))', { count: 'exact' }).eq('userId', userId).order('postId(visitDate)').range(from, to);

  return { data, count };
};
