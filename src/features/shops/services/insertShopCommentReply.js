import supabase from '../../../../supabase';

/**
 * @param {Object} params
 * @param {string} params.comment - Yanıt metni
 * @param {string} params.shopCommentId - Yanıt verilen yorumun ID’si
 * @param {string} params.userId - Yanıtı yazan kullanıcının ID’si
 * @param {Date} [params.now] - Oluşturulma tarihi (isteğe bağlı)
 * @returns {Promise<{ id: number }>}
 */
export const insertShopCommentReply = async ({
  comment,
  shopCommentId,
  userId,
  now = new Date(),
}) => {
  const { data, error } = await supabase
    .from('shop_comment_replies')
    .insert({
      comment,
      shop_comment_id: shopCommentId,
      user_id: userId,
      created_at: now,
      status: true,
      delete_status: false,
    })
    .select('id')
    .single();

  if (error) throw error;

  return data;
};
