import supabase from "../../../../../supabase";


export async function getUserRating(shopId, userId) {
  const { data, error } = await supabase
    .from("shop_ratings")
    .select("id, rating")
    .eq("shop_id", shopId)
    .eq("user_id", userId)
    .eq("delete_status", false)
    .single();

  if (error && error.code !== "PGRST116") { // PGRST116 = no rows found
    console.error("❌ getUserRating error:", error.message);
    return null;
  }

  return data; // null olabilir (hiç puan yoksa)
}