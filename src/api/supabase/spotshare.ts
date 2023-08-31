import { NUMBER_OF_ITEMS, getRangePagination } from '../../components/common/getRangePagination/getRangePagination';
import { Inserts, Update } from './supabase';
import { supabase } from './supabaseClient';

//스팟 필터링
type filteredPostProps = {
  country?: string;
  startDate?: string;
  endDate?: string;
};

export const getFilteredSpotSharePost = async ({ country, startDate, endDate }: filteredPostProps) => {
  let sharePosts = supabase.from('spotPosts').select('*, users!spotPosts_writerId_fkey(*)').order('createdAt', { ascending: false });
  if (country !== undefined) {
    sharePosts = sharePosts.eq('country', country);
  }

  if (startDate !== undefined && endDate !== undefined) {
    sharePosts = sharePosts.gte('visitDate', startDate).lte('visitDate', endDate);
  }

  const { data, error } = await sharePosts;
  if (error) {
    return null;
  }
  return data;
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
  let { data, error } = await supabase.from('spotComments').select('*, users!spotComments_writerId_fkey(*)').order('date', { ascending: false });
  return data;
};
getSpotComments();

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
  let { data } = await supabase.from('spotPosts').select('id');
  return data;
};

// 스팟 댓글 작성자 ID 배열 이긴한데 그냥 스팟 댓글 가져오기에서는 filter 돌려서 찾아야되네. 걍 쓰자.
export const getCommentWriterIds = async () => {
  let { data } = await supabase.from('spotComments').select('writerId');
  return data;
};

// 스팟 답댓글 가져오기(답글 작성한 모든 유저도 같이)
export const getReCommentData = async () => {
  let { data } = await supabase.from('spotReComments').select('*, users!spotReComments_writerId_fkey(*)').order('date', { ascending: true });
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

// 스팟 답댓글 작성자 ID 배열
export const getReCommentWriterIds = async () => {
  let { data } = await supabase.from('spotReComments').select('writerId');
  return data;
};

// let { data: count } = await supabase.from('spotReComments').select('id');

// 스팟공유 모든 글 가져오기
export const getAllSpotSharePost = async () => {
  return await supabase.from('spotPosts').select('*, users!spotPosts_writerId_fkey(*)');
};
//스팟공유 리스트 디폴트 이미지 가져오기
export const getSpotShareDefaultImg = async (country: string) => {
  return await supabase.from('countyInfo').select('imageUrl').eq('country', country);
};

//스팟공유 특정 글 가져오기
export const getDetailSpotSharePost = async (postId: string | undefined) => {
  const { data } = await supabase.from('spotPosts').select('*').eq('id', postId).single();
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

// 내가 작성한 스팟공유 글 가져오기
type mySpotSharePostsType = {
  writerId: string | undefined;
  page: number;
};
export const getMySpotSharePosts = async ({ writerId, page }: mySpotSharePostsType) => {
  const { from, to } = getRangePagination(page, NUMBER_OF_ITEMS);

  const { data, count } = await supabase.from('spotPosts').select('*', { count: 'exact' }).eq('writerId', writerId).order('visitDate', { ascending: false }).range(from, to);
  return { data, count };
};
