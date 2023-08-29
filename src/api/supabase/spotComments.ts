import { Inserts, Update } from './supabase';
import { supabase } from './supabaseClient';

// 클릭한 게시글 id?
export const getSpotPost = async ({ postId }: { postId: string }) => {
  let { data: spotPost } = await supabase.from('spotPosts').select('*').eq('id', postId).single();
  return spotPost;
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
