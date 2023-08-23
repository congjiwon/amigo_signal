import { supabase } from './supabaseClient';

export const getPartnerPosts = async () => {
  let { data: partnerPosts, error } = await supabase.from('partnerPosts').select('*');
  return { data: partnerPosts, error };
};

export const getAuthId = async () => {
  const authId = await supabase.auth.getUser();
  // console.log('여기서', authId.data.user?.id);
  return authId.data.user?.id;
};

export const getUserId = async () => {
  let { data: userId, error } = await supabase.from('users').select('id');
  // console.log('userId', userId);
  return userId;
};
getUserId();
