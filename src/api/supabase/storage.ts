import { supabase } from './supabaseClient';

type modifyProfileImgProps = {
  userEmail: string;
  fileNewName: string;
  newFille: File;
};
export const modifyProfileImg = async ({ userEmail, fileNewName, newFille }: modifyProfileImgProps) => {
  const { data: list } = await supabase.storage.from('profileImgs').list(`profile_imgs/${userEmail}`);
  const filesToRemove = list?.map((x) => `profile_imgs/${userEmail}/${x.name}`);
  await supabase.storage.from('profileImgs').remove(filesToRemove!);

  const { data, error } = await supabase.storage.from('profileImgs').upload(`profile_imgs/${userEmail}/${fileNewName}`, newFille, {
    cacheControl: '3600',
    upsert: true,
  });
  return data;
};
