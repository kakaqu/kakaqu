
import { getShopMainLogo } from "./getShopMainLogo";
import { getShopMainCover } from "./getShopMainCover";
import { getShopMainAddress } from "./getShopMainAddress";
import { getShopAverageRating } from "./getShopAverageRating";
import { getShopCommentCount } from "./getShopCommentCount";
import { getShopSubscriberCount } from "./getShopSubscriberCount";
import { getParentCategoryNameByCategoryId } from "./getParentCategoryNameByCategoryId";
import { isShopBlockedByUser } from "./isShopBlockedByUser";
import { checkUserSubscription } from "./checkUserSubscription"; // ✅ eklendi
import supabase from "../../../../../supabase";

export async function fetchAllShops({ userId, page = 0, limit = 20, searchQuery = "", languageCode = "tr" }) {
  try {
    const from = page * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("shops")
      .select("*")
      .eq("status", true)
      .eq("delete_status", false)
      .range(from, to);

    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    const { data: shops, error } = await query;
    if (error) throw error;

    const result = [];

    for (const shop of shops) {
      const blocked = await isShopBlockedByUser(userId, shop.id);
      if (blocked) continue;

      const [
        logo,
        cover,
        address,
        rating,
        commentCount,
        subscriberCount,
        categoryName,
        isSubscribed, // ✅ takipte miyim
      ] = await Promise.all([
        getShopMainLogo(shop.id),
        getShopMainCover(shop.id),
        getShopMainAddress(shop.id),
        getShopAverageRating(shop.id),
        getShopCommentCount(shop.id),
        getShopSubscriberCount(shop.id),
        getParentCategoryNameByCategoryId(shop.category_id, languageCode),
        checkUserSubscription(shop.id, userId), // ✅ buraya eklendi
      ]);

      result.push({
        id: shop.id,
        name: shop.name,
        description: shop.description,
        category: categoryName || "Kategori bilinmiyor",
        logo,
        cover,
        address,
        rating,
        commentCount,
        subscriberCount,
        isSubscribed, // ✅ ShopCard’da artık kullanabilirsin
      });
    }

    return result;
  } catch (error) {
    console.error("fetchAllShops error:", error.message);
    throw new Error("Dükkanlar yüklenirken hata oluştu.");
  }
}
