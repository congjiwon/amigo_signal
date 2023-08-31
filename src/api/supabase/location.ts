import { supabase } from './supabaseClient';

export const getAllLocation = async () => {
  let { data } = await supabase.from('location').select('*');
  return { data };
};

export const getCountry = async () => {
  let { data } = await supabase.from('location').select('country');
  return { data };
};
