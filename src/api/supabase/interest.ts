import { supabase } from './supabaseClient';

export const getInterests = async () => {
  let { data } = await supabase.from('interest').select('*');
  return { data };
};
