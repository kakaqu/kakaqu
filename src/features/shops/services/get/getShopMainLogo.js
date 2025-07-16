import supabase from '../../../../../supabase';

export const getShopMainLogo = async (shopId) => {
  const { data, error } = await supabase
    .from('shop_logos')
    .select('logo_url')
    .eq('shop_id', shopId)
    .eq('is_main', true)
    .eq('status', true)
    .eq('delete_status', false)
    .maybeSingle();

  return data?.logo_url || null;
};
