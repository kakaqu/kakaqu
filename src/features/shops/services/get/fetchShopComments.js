import supabase from "../../../../../supabase";
import { getBlockedUserIdsByShop } from "./getBlockedUserIdsByShop";

export async function fetchShopComments({ shopId, page = 0, limit = 10 }) {
  try {
    const from = Math.max(0, page * limit);
    const to = from + limit - 1;

    // Engellenen kullanıcıları al
    const blockedUserIds = await getBlockedUserIdsByShop(shopId);

    let query = supabase
      .from("shop_comment")
      .select(`
        id,
        comment,
        created_at,
        user_id,
        users (
          id,
          name,
          user_photos (
            image_url,
            is_main,
            delete_status
          )
        ),
        shop_comment_replies (
          id,
          comment,
          created_at,
          user_id,
          delete_status,
          users (
            id,
            name,
            user_photos (
              image_url,
              is_main,
              delete_status
            )
          )
        )
      `)
      .eq("shop_id", shopId)
      .eq("status", true)
      .eq("delete_status", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (blockedUserIds.length > 0) {
      query = query.not('user_id', 'in', `(${blockedUserIds.join(",")})`);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Yanıtları engellenenlere göre filtrele
    const result = data.map(comment => {
      const user = comment.users || {};
      const avatar = user.user_photos?.find(p => p.is_main && !p.delete_status)?.image_url || null;

      const replies = (comment.shop_comment_replies || [])
        .filter(reply => reply.delete_status === false && !blockedUserIds.includes(reply.user_id))
        .map(reply => {
          const replyUser = reply.users || {};
          const replyAvatar = replyUser.user_photos?.find(p => p.is_main && !p.delete_status)?.image_url || null;

          return {
            id: reply.id,
            comment: reply.comment,
            created_at: reply.created_at,
            user: {
              id: replyUser.id,
              name: replyUser.name,
              avatar: replyAvatar,
            },
          };
        });

      return {
        id: comment.id,
        comment: comment.comment,
        created_at: comment.created_at,
        user: {
          id: user.id,
          name: user.name,
          avatar,
        },
        replies,
      };
    });

    return result;
  } catch (error) {
    console.error("fetchShopComments error:", error.message);
    throw new Error("Yorumlar yüklenirken hata oluştu.");
  }
}
