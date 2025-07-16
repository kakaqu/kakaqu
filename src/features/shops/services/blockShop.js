import supabase from "../../../../supabase";

export const blockShop = async (userId, shopId, reason) => {
  const { error } = await supabase
    .from('user_shop_blocks')
    .upsert({ user_id: userId, shop_id: shopId, reason });

  if (error) throw error;
};