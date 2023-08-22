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
  console.log('파트너코멘트', partnerComments);
  return partnerComments;
};

export const getAuthId = async () => {
  const authId = await supabase.auth.getUser();
  console.log('authId', authId);
  return authId.data;
};
getAuthId();

export const getUserId = async () => {
  let { data: userId, error } = await supabase.from('users').select('id');
  // console.log('userId', userId);
  return userId;
};

export const deletePartnerComments = async () => {
  const { error } = await supabase.from('partnerComments').delete().eq('id', '65711584-1d6f-48e9-bc12-5516ff3c7f5f');
  console.log('error', error);
};

export const updatePartnerComments = async (updateComment: TPartnerUpdate) => {
  const { error } = await supabase.from('partnerComments').update(updateComment);
  // .eq('id', '65711584-1d6f-48e9-bc12-5516ff3c7f5f');
  console.log('error', error);
};
