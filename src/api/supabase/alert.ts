import { supabase } from './supabaseClient';

type NewPostInfoProps = {
  id: string;
  applicantNickName: string;
  logInUserId: string;
  applyId: string;
  postId: string;
  title: string;
  date: string;
  genre: string;
};

// alert 테이블 리스트 가져오기
export const getAlertList = async (userId: string) => {
  const { data } = await supabase.from('alert').select('*').eq('logInUserId', userId);
  return { data };
};

// 참여 신청 시, alert 테이블에 추가
export const addAlert = async (newPostInfo: NewPostInfoProps) => {
  await supabase.from('alert').insert(newPostInfo);
};

// 참여 취소 시, alert 테이블에서 제거
export const deleteAlert = async (id: string, genre: string) => {
  await supabase.from('alert').delete().eq('applyId', id).eq('genre', genre);
};
