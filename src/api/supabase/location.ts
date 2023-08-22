import { supabase } from './supabaseClient';

export const getAllLocation = async () => {
  let { data: country } = await supabase.from('location').select('*');
  return { data: country };
};

export const getCountry = async () => {
  let { data: country } = await supabase.from('location').select('country');
  return { data: country };
};
