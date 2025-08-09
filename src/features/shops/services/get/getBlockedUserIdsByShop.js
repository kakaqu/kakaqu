import supabase from "../../../../../supabase";

export async function getBlockedUserIdsByShop(shopId) {
  try {
    const { data, error } = await supabase
      .from('shop_user_blocks')
      .select('user_id')
      .eq('shop_id', shopId)
      .eq('status', true)
      .eq('delete_status', false);

    if (error) throw error;

    return data.map(item => item.user_id);
  } catch (error) {
    console.error('getBlockedUserIdsByShop error:', error.message);
    return [];
  }
}
