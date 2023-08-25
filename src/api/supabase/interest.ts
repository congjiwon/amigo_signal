import { supabase } from './supabaseClient';

export const getInterests = async () => {
  let { data: interest } = await supabase.from('interest').select('*');
  return { data: interest };
};
