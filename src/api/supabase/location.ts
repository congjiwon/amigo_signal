import { supabase } from './supabaseClient';

export const getAllLocation = async () => {
  const { data } = await supabase.from('location').select('*');
  return { data };
};

export const getCountry = async () => {
  const { data } = await supabase.from('location').select('country');
  return { data };
};
