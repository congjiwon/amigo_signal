import { Inserts, Update } from './supabase';
import { supabase } from './supabaseClient';

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
  let { data: spotCommentsData, error } = await supabase.from('spotComments').select('*, users!spotComments_writerId_fkey(*)').order('date', { ascending: false });
  return spotCommentsData;
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
  let { data: spotPostWriterId } = await supabase.from('spotPosts').select('id');
  return spotPostWriterId;
};

// 스팟 댓글 작성자 ID 배열 이긴한데 그냥 스팟 댓글 가져오기에서는 filter 돌려서 찾아야되네. 걍 쓰자.
export const getCommentWriterIds = async () => {
  let { data: writerId } = await supabase.from('spotComments').select('writerId');
  return writerId;
};

// 스팟 답댓글 가져오기(답글 작성한 모든 유저도 같이)
export const getReCommentData = async () => {
  let { data: reCommentsData } = await supabase.from('spotReComments').select('*, users!spotReComments_writerId_fkey(*)').order('date', { ascending: true });
  return reCommentsData;
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
  let { data: reCommentWriterId } = await supabase.from('spotReComments').select('writerId');
  return reCommentWriterId;
};

// let { data: count } = await supabase.from('spotReComments').select('id');

// 스팟공유 모든 글 가져오기
export const getAllSpotSharePost = async () => {
  return await supabase.from('spotPosts').select('*');
};
//스팟공유 리스트 디폴트 이미지 가져오기
export const getSpotShareDefaultImg = async (country: string) => {
  return await supabase.from('countyInfo').select('imageUrl').eq('country', country);
};

//스팟공유 특정 글 가져오기
export const getDetailSpotSharePost = async (postId: string | undefined) => {
  const { data } = await supabase.from('spotPosts').select('*, users!spotPosts_writerId_fkey(*)').eq('id', postId).single();
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

type likes = { id?: number | undefined; postId: string; userId: string };

//스팟공유 좋아요
// 매개변수로 받은 postId랑 같으면 넣겠다? 뭔소리고;
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
  return await supabase.from('likes').select('*', { count: 'exact' }).eq('postId', postId);
};

// 좋아요 조회
export const getLikes = async () => {
  return await supabase.from('likes').select('*');
};

// 스팟공유 인기순 정렬
export const sortSpot = async () => {
  const { data } = await supabase.from('likes').select('*, spotPosts!postId_fkey(*)');
  return { data };
};
