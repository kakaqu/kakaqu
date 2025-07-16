import supabase from "../../../../../supabase";

/**
 * Belirli bir kullanıcının belirli bir dükkanı engelleyip engellemediğini kontrol eder.
 * 
 * @param {string} userId - Engelleyen kullanıcının ID'si
 * @param {string} shopId - Kontrol edilecek dükkan ID'si
 * @returns {Promise<boolean>} - true: engellenmiş, false: engellenmemiş
 */
export const isShopBlockedByUser = async (userId, shopId) => {
  if (!userId || !shopId) return false;

  const { data, error } = await supabase
    .from('user_shop_blocks')
    .select('id')
    .eq('user_id', userId)
    .eq('shop_id', shopId)
    .maybeSingle();

  if (error) {
    console.error('isShopBlockedByUser error:', error.message);
    return false;
  }

  return !!data;
};
