import supabase from '../../../../supabase';

/**
 * Belirtilen kullanıcıdan bir mağazaya yorum ekler.
 * 
 * @param {Object} param0
 * @param {string} param0.comment - Yorum metni
 * @param {string} param0.userId - Yorumu yazan kullanıcının ID'si
 * @param {string} param0.shopId - Yorumu yapılan mağazanın ID'si
 * @param {boolean} [param0.verified=false] - Yorum onaylı mı
 * @param {boolean} [param0.status=true] - Yorum aktif mi
 * @param {Date|string} [param0.now=new Date()] - Oluşturulma tarihi
 */
export const insertShopComment = async ({
  comment,
  userId,
  shopId,
  verified = true,
  status = true,
  now = new Date(),
}) => {
  const { data, error } = await supabase
    .from('shop_comment')
    .insert({
      comment,
      user_id: userId,
      shop_id: shopId,
      verified,
      status,
      delete_status: false,
      created_at: now,
      update_at: now,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id; // eklenen yorumun ID'si
};
