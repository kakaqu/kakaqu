import supabase from "../../../../supabase";

export async function blockUser({ shopId, userId, reason = null }) {
  const { data, error } = await supabase
    .from("shop_user_blocks")
    .upsert([
      {
        shop_id: shopId,
        user_id: userId,
        reason,
        status: true,
        delete_status: false,
        updated_at: new Date().toISOString()
      }
    ], { onConflict: "shop_id,user_id" }); // aynı kayıt varsa güncelle

  if (error) throw error;
  return data;
}
