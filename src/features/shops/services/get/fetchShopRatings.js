import supabase from "../../../../../supabase";

export async function fetchShopRatings({ shopId, page = 0, limit = 10 }) {
  try {
    const from = Math.max(0, page * limit);
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("shop_ratings")
      .select(`
        id,
        rating,
        created_at,
        users (
          id,
          name,
          user_photos (
            image_url,
            is_main,
            delete_status
          )
        )
      `)
      .eq("shop_id", shopId)
      .eq("status", true)
      .eq("delete_status", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    const result = data.map((rating) => {
      const user = rating.users || {};
      const avatar = user.user_photos?.find(p => p.is_main && !p.delete_status)?.image_url || null;

      return {
        id: rating.id,
        rating: rating.rating,
        created_at: rating.created_at,
        user: {
          id: user.id,
          name: user.name,
          avatar,
        },
      };
    });

    return result;
  } catch (error) {
    console.error("fetchShopRatings error:", error.message);
    throw new Error("Puanlar yüklenirken hata oluştu.");
  }
}
