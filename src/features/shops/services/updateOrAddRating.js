import supabase from "../../../../supabase";
import { getUserRating } from "./get/getUserRating";
import { addRating } from "./addRating";

export async function updateOrAddRating(shopId, userId, rating) {
  const existing = await getUserRating(shopId, userId);
  if (existing) {
    // Güncelle
    const { data, error } = await supabase
      .from("shop_ratings")
      .update({
        rating,
        updated_at: new Date(),  // created_at yerine updated_at kullanalım
        status: true,
        delete_status: false,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("❌ updateRating error:", error.message);
      return null;
    }
    return data;
  } else {
    // Yeni ekle
    return await addRating(shopId, userId, rating);
  }
}
