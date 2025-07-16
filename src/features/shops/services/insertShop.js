import supabase from '../../../../supabase';

export const insertShop = async ({ name, description, categoryId, userId, mobile, now }) => {
  const { data, error } = await supabase
    .from('shops')
    .insert({
      name,
      description,
      category_id: categoryId,
      user_id: userId,
      mobile, // ✅ yeni alan
      created_at: now,
      update_at: now,
      status: true,
      delete_status: false,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};
