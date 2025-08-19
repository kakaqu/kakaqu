import supabase from "../../../../../supabase";

export async function isSubscribed(shopId, userId) {
  const { count, error } = await supabase
    .from('shop_subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('shop_id', shopId)
    .eq('user_id', userId)
    .eq('delete_status', false);

  if (error) {
    console.error('❌ isSubscribed error:', error.message);
    return false;
  }

  return count > 0;
}
