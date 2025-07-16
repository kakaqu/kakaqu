import supabase from '../../../../../supabase';

export async function getShopAverageRating(shopId) {
  const { data, error } = await supabase
    .from('shop_ratings')
    .select('rating')
    .eq('shop_id', shopId)
    .eq('delete_status', false);

  if (error) {
    console.error('❌ getShopAverageRating error:', error.message);
    return 0;
  }

  if (!data?.length) return 0;

  const avg = data.reduce((sum, r) => sum + (r.rating || 0), 0) / data.length;
  return parseFloat(avg.toFixed(1));
}
