import supabase from "../../../../../supabase";
import { isShopBlockedByUser } from "./isShopBlockedByUser";
import { checkUserSubscription } from "./checkUserSubscription";

export async function fetchAllShops({ userId, page = 0, limit = 20, searchQuery = "", languageCode = "tr" }) {
  try {
    const from = Math.max(0, page * limit);

    // Toplam kayıt sayısını al
    let countQuery = supabase
      .from("shops")
      .select("id", { count: "exact", head: true })
      .eq("status", true)
      .eq("delete_status", false);

    if (searchQuery) {
      countQuery = countQuery.ilike("name", `%${searchQuery}%`);
    }

    const { count: totalCount, error: countError } = await countQuery;
    if (countError) throw countError;

    if (totalCount === 0 || from >= totalCount) return [];

    const to = Math.min(from + limit - 1, totalCount - 1);

    const { data: shops, error } = await supabase
      .from("shops")
      .select(`
        id,
        name,
        description,
        mobile,
        user_id,
        category_id,
        shop_logos(logo_url, is_main, status, delete_status),
        shop_covers(image_url, is_main, status, delete_status),
        shop_addresses(
          address_line,
          latitude,
          longitude,
          is_main,
          status,
          delete_status,
          provinces(name),
          district(name)
        ),
        shop_ratings(rating, status, delete_status),
        shop_comment(id, status, delete_status),
        shop_subscriptions(id, status, delete_status),
        parent_categories(
          status,
          delete_status,
          parent_categories_translations(name, language_code)
        )
      `)
      .eq("status", true)
      .eq("delete_status", false)
      .range(from, to)
      .ilike("name", `%${searchQuery}%`);

    if (error) throw error;

    const result = [];

    for (const shop of shops) {
      const blocked = await isShopBlockedByUser(userId, shop.id);
      if (blocked) continue;

      const isSubscribed = await checkUserSubscription(shop.id, userId);

      // Filtrelenmiş logo ve kapak
      const logos = (shop.shop_logos || []).filter(l => l.status && !l.delete_status);
      const logo = logos.find(l => l.is_main)?.logo_url || null;

      const covers = (shop.shop_covers || []).filter(c => c.status && !c.delete_status);
      const cover = covers.find(c => c.is_main)?.image_url || null;

      // Filtrelenmiş adres
      const addresses = (shop.shop_addresses || []).filter(a => a.status && !a.delete_status);
      const mainAddress = addresses.find(a => a.is_main) || {};
      const address = {
        line: mainAddress.address_line || "",
        latitude: mainAddress.latitude || null,
        longitude: mainAddress.longitude || null,
        provinceName: mainAddress.provinces?.name || "",
        districtName: mainAddress.district?.name || "",
      };

      // Filtrelenmiş puanlar
      const ratings = (shop.shop_ratings || []).filter(r => r.status && !r.delete_status);
      const rating = ratings.length > 0
        ? parseFloat((ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length).toFixed(1))
        : 0.0;

      // Filtrelenmiş yorum ve takipçi sayısı
      const comments = (shop.shop_comment || []).filter(c => c.status && !c.delete_status);
      const commentCount = comments.length;

      const subscriptions = (shop.shop_subscriptions || []).filter(s => s.status && !s.delete_status);
      const subscriberCount = subscriptions.length;

      // Kategori adı bul
      const categoryName =
        shop.parent_categories?.parent_categories_translations?.find(
          (t) => t.language_code === languageCode
          )?.name || "Kategori bilinmiyor";

      result.push({
        id: shop.id,
        name: shop.name,
        description: shop.description,
        mobile: shop.mobile,
        user_id: shop.user_id,
        category: categoryName,
        logo,
        cover,
        address,
        rating,
        commentCount,
        subscriberCount,
        isSubscribed,
      });
    }

    return result;
  } catch (error) {
    console.error("fetchAllShops error:", error.message);
    throw new Error("Dükkanlar yüklenirken hata oluştu.");
  }
}





// import { getShopMainLogo } from "./getShopMainLogo";
// import { getShopMainCover } from "./getShopMainCover";
// import { getShopMainAddress } from "./getShopMainAddress";
// import { getShopAverageRating } from "./getShopAverageRating";
// import { getShopCommentCount } from "./getShopCommentCount";
// import { getShopSubscriberCount } from "./getShopSubscriberCount";
// import { getParentCategoryNameByCategoryId } from "./getParentCategoryNameByCategoryId";
// import { isShopBlockedByUser } from "./isShopBlockedByUser";
// import { checkUserSubscription } from "./checkUserSubscription"; // ✅ eklendi
// import supabase from "../../../../../supabase";

// export async function fetchAllShops({ userId, page = 0, limit = 20, searchQuery = "", languageCode = "tr" }) {
//   try {
//     const from = page * limit;
//     const to = from + limit - 1;

//     let query = supabase
//       .from("shops")
//       .select("*")
//       .eq("status", true)
//       .eq("delete_status", false)
//       .range(from, to);

//     if (searchQuery) {
//       query = query.ilike("name", `%${searchQuery}%`);
//     }

//     const { data: shops, error } = await query;
//     if (error) throw error;

//     const result = [];

//     for (const shop of shops) {
//       const blocked = await isShopBlockedByUser(userId, shop.id);
//       if (blocked) continue;

//       const [
//         logo,
//         cover,
//         address,
//         rating,
//         commentCount,
//         subscriberCount,
//         categoryName,
//         isSubscribed, // ✅ takipte miyim
//       ] = await Promise.all([
//         getShopMainLogo(shop.id),
//         getShopMainCover(shop.id),
//         getShopMainAddress(shop.id),
//         getShopAverageRating(shop.id),
//         getShopCommentCount(shop.id),
//         getShopSubscriberCount(shop.id),
//         getParentCategoryNameByCategoryId(shop.category_id, languageCode),
//         checkUserSubscription(shop.id, userId), // ✅ buraya eklendi
//       ]);

//       result.push({
//         id: shop.id,
//         name: shop.name,
//         description: shop.description,
//         category: categoryName || "Kategori bilinmiyor",
//         logo,
//         cover,
//         address,
//         rating,
//         commentCount,
//         subscriberCount,
//         isSubscribed, // ✅ ShopCard’da artık kullanabilirsin
//       });
//     }

//     return result;
//   } catch (error) {
//     console.error("fetchAllShops error:", error.message);
//     throw new Error("Dükkanlar yüklenirken hata oluştu.");
//   }
// }
