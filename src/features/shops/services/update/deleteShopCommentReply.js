import supabase from "../../../../../supabase";

/**
 * Bir mağaza yorum yanıtını soft delete yapar.
 * 
 * @param {string} id - Silinecek yanıtın ID'si
 */
export const deleteShopCommentReply = async (id) => {

    const getId = (id) => {
    if (typeof id === 'string') return id;
    if (id && typeof id.id === 'string') return id.id;
    if (id && id.id && typeof id.id.id === 'string') return id.id.id; // nested hatalara karşı
    return '';
  };
  const { data, error } = await supabase
    .from('shop_comment_replies')
    .update({
      delete_status: true,
      status: false,
      update_at: new Date(),
    })
    .eq('id', getId(id))
    .select('id')
    .single();

  if (error) throw error;
  return data;
};
