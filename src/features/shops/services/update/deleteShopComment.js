import supabase from "../../../../../supabase";

/**
 * Bir mağaza yorumunu soft delete yapar.
 * 
 * @param {string} id - Yorumu silinecek yorumun ID'si
 */
export const deleteShopComment = async (id) => {
 const getId = (id) => {
    if (typeof id === 'string') return id;
    if (id && typeof id.id === 'string') return id.id;
    if (id && id.id && typeof id.id.id === 'string') return id.id.id; // nested hatalara karşı
    return '';
  };
  const { data, error } = await supabase
    .from('shop_comment')
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
