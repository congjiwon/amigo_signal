import { supabase } from './supabaseClient';

export const getUser = async ({ userId }: { userId: string }) => {
  const { data } = await supabase.from('users').select('*').eq('id', userId).single();
  return { data };
};

// user 정보 배열
export const getUsers = async () => {
  const { data } = await supabase.from('users').select('id, nickName, profileImageUrl');
  return data;
};

// user ID
export const getUserIds = async () => {
  const { data } = await supabase.from('users').select('id');
  return data;
};

// 현재 로그인 한 유저
export const getAuthId = async () => {
  const authId = await supabase.auth.getUser();
  return authId.data.user?.id;
};

const authId = getAuthId();

export const getCurrentUser = async (userId: string) => {
  const { data } = await supabase.from('users').select('*').eq('id', userId).single();
  return data;
};

type duplicationCheckProps = {
  columnName: string;
  value: string;
};
export const duplicationCheckFromUserTable = async ({ columnName, value }: duplicationCheckProps) => {
  const { data, error } = await supabase.from('users').select(columnName).eq(columnName, value);
  if (data?.length !== undefined && data.length > 0) {
    return true;
  }
  return false;
};

type userNickNameProps = {
  nickName: string | undefined;
  userId?: string | null;
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
