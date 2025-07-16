import supabase from '../../../../../supabase';

export async function getShopByUserId(userId) {
  const { data, error } = await supabase
    .from('shops')
    .select(`
      id,
      name,
      description,
      mobile,
      category_id,
      shop_logos!shop_logos_shop_id_fkey (
        logo_url, is_main, delete_status, status
      ),
      shop_addresses!shop_addresses_shop_id_fkey (
        province_id, district_id, is_main, delete_status, status
      )
    `)
    .eq('user_id', userId)
    .eq('delete_status', false)
    .eq('status', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('❌ getShopByUserId error:', error.message);
    return null;
  }

  const mainLogo = (data.shop_logos || []).find(l => l.is_main && !l.delete_status && l.status);
  const mainAddress = (data.shop_addresses || []).find(a => a.is_main && !a.delete_status && a.status);

  return {
    id: data.id,
    name: data.name,
    description: data.description || '',
    mobile: data.mobile || '',
    categoryId: data.category_id,
    avatar: mainLogo?.logo_url || null,
    provinceId: mainAddress?.province_id || null,
    districtId: mainAddress?.district_id || null,
  };
}