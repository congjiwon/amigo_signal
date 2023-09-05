import { supabase } from './supabaseClient';

export const getInterests = async () => {
  const { data } = await supabase.from('interest').select('*');
  return { data };
};
