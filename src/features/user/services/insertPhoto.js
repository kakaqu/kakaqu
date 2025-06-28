import supabase from '../../../../supabase';

export const insertPhoto = async ({ userId, uploadedUrl, now, description }) => {
  const { error } = await supabase.from('user_photos').insert({
    user_id: userId,
    is_main: true,
    image_url: uploadedUrl,
    created_at: now,
    update_at: now,
    status: true,
    delete_status: false,
    description: description,
  });
  if (error) throw error;
};