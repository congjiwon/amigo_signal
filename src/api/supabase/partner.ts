import { TPartnerInsert, TPartnerUpdate } from './supabase';
import { supabase } from './supabaseClient';

export const getPartnerPosts = async () => {
  let { data: partnerPosts, error } = await supabase.from('partnerPosts').select('*, users!partnerPosts_writerId_fkey(*)');
  return { data: partnerPosts, error };
};

export const getPartnerPost = async ({ postId }: { postId: string }) => {
  let { data: partnerPosts } = await supabase.from('partnerPosts').select('*').eq('id', postId).single();
  return { data: partnerPosts };
};

// 동행 댓글 작성
export const postPartnerComment = async (newPartnerComment: TPartnerInsert) => {
  const { error } = await supabase.from('partnerComments').insert(newPartnerComment);
  console.log('error', error);
};

// 동행 댓글 가져오기
export const getPartnerComments = async () => {
  let { data: partnerComments, error } = await supabase.from('partnerComments').select('*');
  return partnerComments;
};

export const getCommentId = async () => {
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

export const getWriterId = async () => {
  let { data: writerId, error } = await supabase.from('partnerComments').select('writerId');
  return writerId;
};

// 동행 댓글 삭제
export const deletePartnerComments = async (commentId: string) => {
  const { error } = await supabase.from('partnerComments').delete().eq('id', commentId);
  console.log('error', error);
};

// 동행 댓글 수정
export const updatePartnerComments = async (updateComment: TPartnerUpdate) => {
  const { data: testData, error } = await supabase.from('partnerComments').update(updateComment);
  console.log('error', error);
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
