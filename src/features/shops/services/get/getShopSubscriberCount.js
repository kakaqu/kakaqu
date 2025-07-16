import supabase from '../../../../../supabase';

export async function getShopSubscriberCount(shopId) {
  const { count, error } = await supabase
    .from('shop_subscriptions')
    .select('id', { count: 'exact', head: true })
    .eq('shop_id', shopId)
    .eq('delete_status', false);

  if (error) {
    console.error('❌ getShopSubscriberCount error:', error.message);
    return 0;
  }

  return count || 0;
}