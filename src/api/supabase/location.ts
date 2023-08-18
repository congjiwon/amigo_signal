import { supabase } from './supabaseClient';

export const getCountry = async () => {
  let { data: country } = await supabase.from('location').select('country');
  return { data: country };
};
