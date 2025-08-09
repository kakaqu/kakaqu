import supabase from "../../../../../supabase";

/**
 * Yorum yanıt metnini günceller.
 * 
 * @param {Object} params
 * @param {string} params.id - Güncellenecek yanıtın ID'si
 * @param {string} params.comment - Yeni yanıt metni
 * @param {Date|string} [params.now=new Date()] - Güncelleme tarihi (opsiyonel)
 * @returns {Promise<void>}
 */
export const updateShopCommentReply = async ({ id, comment, now = new Date() }) => {
  // UUID kontrolü ve düzeltme
  const getId = (id) => {
    if (typeof id === 'string') return id;
    if (id && typeof id.id === 'string') return id.id;
    if (id && id.id && typeof id.id.id === 'string') return id.id.id; // nested hatalara karşı
    return '';
  };

  const { data, error } = await supabase
    .from('shop_comment_replies')
    .update({
      comment,
      update_at: now,
    })
    .eq('id', getId(id))
    .select('id')
    .single();

  if (error) throw error;
  return data;
};
