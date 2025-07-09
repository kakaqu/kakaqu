import supabase from '../../../../supabase';

export const insertShopAddress = async ({
  shopId,
  provinceId,
  districtId,
  addressLine = '',
  latitude = null,
  longitude = null,
  now,
}) => {
  const insertData = {
    shop_id: shopId,
    province_id: provinceId,
    district_id: districtId,
    is_main: true,
    address_line: addressLine,
    created_at: now,
    update_at: now,
    status: true,
    delete_status: false,
  };

  // Yalnızca sağlanan koordinatları ekle
  if (latitude !== null) insertData.latitude = latitude;
  if (longitude !== null) insertData.longitude = longitude;

  const { error } = await supabase.from('shop_addresses').insert(insertData);

  if (error) throw error;
};
