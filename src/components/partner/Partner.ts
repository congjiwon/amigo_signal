import { TPartnerInsert, TPartnerUpdate } from '../../api/supabase/supabase';
import { supabase } from '../../api/supabase/supabaseClient';

// 설빈: 로그인 연동 후 수정
// type TPartnerForCommentUpdate = {
//   id: string,
//   inputValue: TPartnerUpdate
// }

export const postPartnerComment = async (newPartnerComment: TPartnerInsert) => {
  const { error } = await supabase.from('partnerComments').insert(newPartnerComment);
  console.log('error', error);
};

export const getPartnerComments = async () => {
  let { data: partnerComments, error } = await supabase.from('partnerComments').select('*');
  return partnerComments;
};

export const getAuthId = async () => {
  const authId = await supabase.auth.getUser();
  return authId.data.user?.id;
};
const authId = getAuthId();

export const getUserId = async () => {
  let { data: userId, error } = await supabase.from('users').select('id');
  return userId;
};

export const getCommentPostId = async () => {
  let { data: commentPostId, error } = await supabase.from('partnerComments').select('postId');
};

export const getPartnerPostId = async () => {
  let { data: partnerPostId, error } = await supabase.from('partnerPosts').select('id');
};

// supabase 삭제
export const getCommentId = async () => {
  let { data: commentId, error } = await supabase.from('partnerComments').select('id');
  console.log('zz', commentId);
};
getCommentId();

export const deletePartnerComments = async (commentId: string) => {
  const { error } = await supabase.from('partnerComments').delete().eq('id', commentId);
  console.log('error', error);
};

export const updatePartnerComments = async (updateComment: TPartnerUpdate) => {
  const { error } = await supabase.from('partnerComments').update(updateComment);
  // .eq('id', '65711584-1d6f-48e9-bc12-5516ff3c7f5f');
  console.log('error', error);
};
