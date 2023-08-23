import { supabase } from './supabaseClient';

export const getPartnerPosts = async () => {
  let { data: partnerPosts, error } = await supabase.from('partnerPosts').select('*');
  return { data: partnerPosts, error };
};

export const getPartnerPost = async ({ postId }: { postId: string }) => {
  let { data: partnerPosts } = await supabase.from('partnerPosts').select('*').eq('id', postId).single();
  return { data: partnerPosts };
};
