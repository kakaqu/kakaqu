import supabase from "../../../../supabase";

export async function addRating(shopId, userId, rating) {
  const { data, error } = await supabase
    .from("shop_ratings")
    .insert([{
      shop_id: shopId,
      user_id: userId,
      rating: rating,
      status: true,
      delete_status: false,
      created_at: new Date(),
      updated_at: new Date(),
    }])
    .select()
    .single();

  if (error) {
    console.error("❌ addRating error:", error.message);
    return null;
  }
  return data;
}
