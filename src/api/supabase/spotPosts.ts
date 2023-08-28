import { Inserts } from './supabase';
import { supabase } from './supabaseClient';

export const insertSpotPost = async (spotPostData: Inserts<'spotPosts'>) => {
  const { data, error } = await supabase.from('spotPosts').insert(spotPostData).select();
  if (error) {
    console.log(error);
  }
  return data;
};
