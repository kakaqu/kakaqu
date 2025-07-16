import supabase from '../../../../../supabase';

export const getShopMainCover = async (shopId) => {
  const { data, error } = await supabase
    .from('shop_covers')
    .select('image_url')
    .eq('shop_id', shopId)
    .eq('is_main', true)
    .eq('status', true)
    .eq('delete_status', false)
    .maybeSingle();

  return data?.image_url || null;
};
