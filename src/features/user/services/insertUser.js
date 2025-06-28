import supabase from '../../../../supabase';

export const insertUser = async ({ name, phoneNumber, languageId, now }) => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      name,
      mobile: phoneNumber,
      language_id: languageId,
      created_at: now,
      update_at: now,
      status: true,
      delete_status: false,
      is_online: false,
      last_login: now,
    })
    .select('id')
    .single();

  if (error || !data) throw error;
  return data.id;
};
