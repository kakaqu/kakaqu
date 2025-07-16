import supabase from '../../../../../supabase';

export async function getShopCommentCount(shopId) {
  const { count, error } = await supabase
    .from('shop_comment')
    .select('id', { count: 'exact', head: true })
    .eq('shop_id', shopId)
    .eq('delete_status', false);

  if (error) {
    console.error('❌ getShopCommentCount error:', error.message);
    return 0;
  }

  return count || 0;
}
