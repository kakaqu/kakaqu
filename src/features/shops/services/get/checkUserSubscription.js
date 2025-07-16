import supabase from '../../../../../supabase';

export async function checkUserSubscription(shopId, userId) {
  const { data, error } = await supabase
    .from('shop_subscriptions')
    .select('id')
    .match({
      shop_id: shopId,
      user_id: userId,
      status: true,
      delete_status: false,
    })
    .maybeSingle();

  if (error) {
    console.error('❌ checkUserSubscription error:', error.message);
    return false;
  }

  return Boolean(data);
}
