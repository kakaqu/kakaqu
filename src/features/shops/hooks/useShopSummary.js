import { useQuery } from '@tanstack/react-query';
import { getShopByUserId } from '../services/getShopByUserId';
import { getShopCommentCount } from '../services/getShopCommentCount';
import { getShopSubscriberCount } from '../services/getShopSubscriberCount';
import { getShopAverageRating } from '../services/getShopAverageRating';
import { getParentCategoryNameByCategoryId } from '../services/getParentCategoryNameByCategoryId';

export const useShopSummary = (userId) => {
  return useQuery(['shop-summary', userId], async () => {
    const shop = await getShopByUserId(userId);
    if (!shop) return null;

    const [commentCount, subscriberCount, avgRating, categoryName] = await Promise.all([
      getShopCommentCount(shop.id),
      getShopSubscriberCount(shop.id),
      getShopAverageRating(shop.id),
      getParentCategoryNameByCategoryId(shop.categoryId),
    ]);

    return {
      ...shop,
      commentCount,
      subscriberCount,
      averageRating: avgRating,
      parentCategoryName: categoryName,
    };
  }, {
    staleTime: 1000 * 60 * 5, // 5 dakika cache
    retry: 2,
    retryDelay: 1000,
  });
};
