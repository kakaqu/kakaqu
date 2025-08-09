import supabase from "../../../../../supabase";

export async function fetchShopFollowers({ shopId, page = 0, limit = 10 }) {
  try {
    const from = Math.max(0, page * limit);
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("shop_subscriptions")
      .select(`
        user_id,
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

    const result = data.map((subscription) => {
      const user = subscription.users || {};
      const avatar = user.user_photos?.find(p => p.is_main && !p.delete_status)?.image_url || null;

      return {
        id: user.id,
        name: user.name,
        avatar,
        followedAt: subscription.created_at,
      };
    });

    return result;
  } catch (error) {
    console.error("fetchShopFollowers error:", error.message);
    throw new Error("Takipçiler yüklenirken hata oluştu.");
  }
}
