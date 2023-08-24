import { supabase } from './supabaseClient';

export const getUser = async ({ userId }: { userId: string }) => {
  let { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
  return { data: user };
};

// user 정보 배열
export const getUsers = async () => {
  let { data: userData } = await supabase.from('users').select('id, nickName, profileImageUrl');
  return userData;
};

// user ID
export const getUserIds = async () => {
  let { data: userIdData } = await supabase.from('users').select('id');
  return userIdData;
};

// 현재 로그인 한 유저
export const getAuthId = async () => {
  const authId = await supabase.auth.getUser();
  // console.log('여기서', authId.data.user?.id);
  return authId.data.user?.id;
};

const authId = getAuthId();

export const getCurrentUser = async (userId: string) => {
  let { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
  return user;
};
