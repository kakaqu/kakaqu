import supabase from "../../../../supabase";

export async function unfollowShop(shopId, userId) {
  const { error } = await supabase
    .from('shop_subscriptions')
    .update({
      status: false,
      delete_status: true,
      update_at: new Date(),
    })
    .eq('shop_id', shopId)
    .eq('user_id', userId);

  if (error) {
    console.error('❌ unfollowShop error:', error.message);
    return false;
  }

  return true;
}

