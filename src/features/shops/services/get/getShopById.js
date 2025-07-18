import supabase from "../../../../../supabase";
import { isShopBlockedByUser } from "./isShopBlockedByUser";
import { checkUserSubscription } from "./checkUserSubscription";

export async function getShopById(shopId, userId = null, languageCode = "tr") {
  try {
    const { data: shop, error } = await supabase
      .from("shops")
      .select(`
        id,
        name,
        description,
        mobile,
        user_id,
        category_id,
        status,
        delete_status,
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
      .eq("id", shopId)
      .eq("status", true)
      .eq("delete_status", false)
      .single();

    if (error || !shop) return null;

    // Engellenmişse null dön
    if (userId) {
      const blocked = await isShopBlockedByUser(userId, shop.id);
      if (blocked) return null;
    }

    // Abonelik kontrolü
    const isSubscribed = userId
      ? await checkUserSubscription(shop.id, userId)
      : false;

    // Logo
    const logos = (shop.shop_logos || []).filter(l => l.status && !l.delete_status);
    const logo = logos.find(l => l.is_main)?.logo_url || null;

    // Kapak
    const covers = (shop.shop_covers || []).filter(c => c.status && !c.delete_status);
    const cover = covers.find(c => c.is_main)?.image_url || null;

    // Adres
    const addresses = (shop.shop_addresses || []).filter(a => a.status && !a.delete_status);
    const mainAddress = addresses.find(a => a.is_main) || {};
    const address = {
      line: mainAddress.address_line || "",
      latitude: mainAddress.latitude || null,
      longitude: mainAddress.longitude || null,
      provinceName: mainAddress.provinces?.name || "",
      districtName: mainAddress.district?.name || "",
    };

    // Puan
    const ratings = (shop.shop_ratings || []).filter(r => r.status && !r.delete_status);
    const rating = ratings.length > 0
      ? parseFloat((ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length).toFixed(1))
      : 0.0;

    // Yorum ve takipçi
    const comments = (shop.shop_comment || []).filter(c => c.status && !c.delete_status);
    const commentCount = comments.length;

    const subscriptions = (shop.shop_subscriptions || []).filter(s => s.status && !s.delete_status);
    const subscriberCount = subscriptions.length;

    // Kategori adı (çeviri)
    const categoryName =
      shop.parent_categories?.parent_categories_translations?.find(
        (t) => t.language_code === languageCode
      )?.name || "Kategori bilinmiyor";

    return {
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
    };
  } catch (err) {
    console.error("getShopById error:", err.message);
    throw new Error("Mağaza bilgisi alınamadı.");
  }
}
