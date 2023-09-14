import { supabase } from './supabaseClient';

type NewPostInfoProps = {
  id: string;
  logInUserId: string;
  applyId: string;
  postId: string;
  title: string;
  date: string;
  genre?: string;
};

// 참여 신청 시, alert 테이블에 추가
export const addAlert = async (newPostInfo: NewPostInfoProps) => {
  await supabase.from('alert').insert(newPostInfo);
};
