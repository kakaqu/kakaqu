import supabase from '../../../../supabase';

export const insertAddress = async ({ userId, provinceId, districtId, address = '', now }) => {
  const { error } = await supabase.from('user_addresses').insert({
    user_id: userId,
    province_id: provinceId,
    district_id: districtId,
    is_main: true,
    address,
    created_at: now,
    update_at: now,
    status: true,
    delete_status: false,
  });
  if (error) throw error;
};