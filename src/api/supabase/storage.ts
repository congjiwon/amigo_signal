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

type uploadQuillImgProps = {
  fileNewName: string;
  newFille: File;
};
export const uploadQuillImg = async ({ fileNewName, newFille }: uploadQuillImgProps) => {
  const { data: upload } = await supabase.storage.from('quillImgs').upload(`quill_imgs/${fileNewName}`, newFille);

  const { data } = supabase.storage.from('quillImgs').getPublicUrl(`quill_imgs/${fileNewName}`);
  return data;
};

type removeQuillImgProps = {
  removeImgArray: string[];
};
export const removeQuillImg = async ({ removeImgArray }: removeQuillImgProps) => {
  const { data } = await supabase.storage.from('quillImgs').remove(removeImgArray);
};
