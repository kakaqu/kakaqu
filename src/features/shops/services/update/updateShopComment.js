import supabase from "../../../../../supabase";

/**
 * Yorum metnini günceller.
 * 
 * @param {Object} params
 * @param {string} params.id - Güncellenecek yorumun ID'si
 * @param {string} params.comment - Yeni yorum metni
 * @param {Date|string} [params.now=new Date()] - Güncelleme tarihi (opsiyonel)
 * @returns {Promise<void>}
 */
export const updateShopComment = async ({ id, comment, now = new Date() }) => {

  const getId = (id) => {
    if (typeof id === 'string') return id;
    if (id && typeof id.id === 'string') return id.id;
    if (id && id.id && typeof id.id.id === 'string') return id.id.id; // nested hatalara karşı
    return '';
  };
  const { data, error } = await supabase
    .from('shop_comment')
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