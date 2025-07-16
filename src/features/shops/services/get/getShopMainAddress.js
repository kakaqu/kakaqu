import supabase from '../../../../../supabase';

export const getShopMainAddress = async (shopId) => {
  const { data, error } = await supabase
    .from('shop_addresses')
    .select(`
      province_id,
      district_id,
      latitude,
      longitude,
      provinces ( name ),
      district ( name )
    `)
    .eq('shop_id', shopId)
    .eq('is_main', true)
    .eq('status', true)
    .eq('delete_status', false)
    .maybeSingle();

  if (!data) return null;

  return {
    provinceName: data.provinces?.name || '',
    districtName: data.district?.name || '',
    latitude: data.latitude || null,
    longitude: data.longitude || null,
  };
};
