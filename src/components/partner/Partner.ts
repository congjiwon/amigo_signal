import { TPartnerInsert } from '../../api/supabase/supabase';
import { supabase } from '../../api/supabase/supabaseClient';

export const postPartnerComment = async (newPartnerComment: TPartnerInsert) => {
  const { error } = await supabase.from('partnerComments').insert(newPartnerComment);
  console.log('error', error);
};

export const getPartnerComments = async () => {
  let { data: partnerComments, error } = await supabase.from('partnerComments').select('*');
  return partnerComments;
};

export const deletePartnerComments = async () => {
  const { error } = await supabase.from('partnerComments').delete().eq('id', '4c228290-98b3-4de3-b7cd-4cbb9c14b460');
  console.log('error', error);
};
