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

export const insertPost = async (dataToInsert: any) => {
  try {
    const { data, error } = await supabase.from('partnerPosts').insert(dataToInsert);
    if (error) {
      console.error('Insert error:', error);
    } else {
      console.log('Inserted data:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
