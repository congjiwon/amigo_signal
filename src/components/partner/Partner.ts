import { TPartnerInsert, TPartnerUpdate } from '../../api/supabase/supabase';
import { supabase } from '../../api/supabase/supabaseClient';

// 설빈: 로그인 연동 후 수정
// type TPartnerForCommentUpdate = {
//   id: string,
//   inputValue: TPartnerUpdate
// }

// 댓글 작성
export const postPartnerComment = async (newPartnerComment: TPartnerInsert) => {
  const { error } = await supabase.from('partnerComments').insert(newPartnerComment);
  console.log('error', error);
};

// 댓글 가져오기
export const getPartnerComments = async () => {
  let { data: partnerComments, error } = await supabase.from('partnerComments').select('*');
  return partnerComments;
};

// 현재 로그인 한 유저
export const getAuthId = async () => {
  const authId = await supabase.auth.getUser();
  return authId.data.user?.id;
};
const authId = getAuthId();

// user 테이블 ID
export const getUserId = async () => {
  let { data: userData } = await supabase.from('users').select('*');
  return userData;
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

// 댓글 삭제
export const deletePartnerComments = async (commentId: string) => {
  const { error } = await supabase.from('partnerComments').delete().eq('id', commentId);
  console.log('error', error);
};

export const updatePartnerComments = async (updateComment: TPartnerUpdate) => {
  const { error } = await supabase.from('partnerComments').update(updateComment);
  // .eq('id', '65711584-1d6f-48e9-bc12-5516ff3c7f5f');
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