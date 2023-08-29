import { supabase } from './supabaseClient';

// 스팟공유 모든 글 가져오기
export const getAllSpotSharePost = async () => {
  return await supabase.from('spotPosts').select('*');
};

//스팟공유 리스트 디폴트 이미지 가져오기
export const getSpotShareDefaultImg = async (country: string) => {
  return await supabase.from('countyInfo').select('imageUrl').eq('country', country);
};

//스팟공유 특정 글 가져오기
export const getDetailSpotSharePost = async (postId: string | undefined) => {
  return await supabase.from('spotPosts').select('*').eq('id', postId);
};

//스팟공유 게시글 삭제
export const deleteSpotSharePost = async (postId: string | undefined) => {
  const { error } = await supabase.from('spotPosts').delete().eq('id', postId);
  console.log('글 삭제 에러', error);
};
