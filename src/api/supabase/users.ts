import { supabase } from './supabaseClient';

export const getUser = async ({ userId }: { userId: string }) => {
  let { data: user } = await supabase.from('users').select('*').eq('id', userId).single();
  return { data: user };
};
