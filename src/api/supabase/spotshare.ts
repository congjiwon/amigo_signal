import { supabase } from './supabaseClient';

// 스팟공유 글 가져오기
export const getSpotSharePost = async () => {
  return await supabase.from('spotPosts').select('*');
};

//스팟공유 리스트 디폴트 이미지 가져오기
export const getSpotShareDefaultImg = async (country: string) => {
  return await supabase.from('countyInfo').select('imageUrl').eq('country', country);
};
