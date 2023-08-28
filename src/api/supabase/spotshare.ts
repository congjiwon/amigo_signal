import { supabase } from './supabaseClient';

// 스팟공유 글 가져오기
export const getSpotSharePost = async () => {
  return await supabase.from('spotPosts').select('*');
};
