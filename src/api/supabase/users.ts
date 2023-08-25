import { supabase } from './supabaseClient';

export const getUser = async ({ userId }: { userId: string }) => {
  let { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
  return { data: user };
};

// user 테이블 ID
export const getUsers = async () => {
  let { data: userData } = await supabase.from('users').select('*');
  return userData;
};

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

export const duplicationCheckFromUserTable = async (columnName: string, value: string) => {
  let { data: users, error } = await supabase.from('users').select(columnName).eq(columnName, value);
  if (users?.length !== undefined && users.length > 0) {
    return true;
  }
  return;
};

type userNickNameProps = {
  nickName: string | undefined;
  userId: string | undefined;
};

export const updateUserNickname = async ({ nickName, userId }: userNickNameProps) => {
  const { data, error } = await supabase.from('users').update({ nickName }).eq('id', userId).select();
  return data;
};

type userProfileImgUrlProps = {
  profileImageUrl: string | undefined;
  userId: string | undefined;
};

export const updateUserProfileImgUrl = async ({ profileImageUrl, userId }: userProfileImgUrlProps) => {
  const { data, error } = await supabase.from('users').update({ profileImageUrl }).eq('id', userId).select();
  return data;
};
