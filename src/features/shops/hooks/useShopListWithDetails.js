import { useQuery } from '@tanstack/react-query';
import { fetchAllShops } from '../services/get/fetchAllShops';
import { getShopAverageRating } from '../services/get/getShopAverageRating';
import { getShopCommentCount } from '../services/get/getShopCommentCount';
import { getShopSubscriberCount } from '../services/get/getShopSubscriberCount';
import { checkUserSubscription } from '../services/get/checkUserSubscription';
import { useSelector } from 'react-redux';
import getLanguageCode from '../../../shared/services/getLanguageCode';

export const useShopListWithDetails = () => {
  const userId = useSelector((state) => state.user.id);
  const languageId = useSelector((state) => state.user.languageId || 'fa');
  const userShopId = useSelector((state) => state.shop.id); // engelledikleri için lazım
  const languageCode = getLanguageCode(languageId);

  return useQuery({
    queryKey: ['shopListWithDetails', languageCode, userId],
    queryFn: async () => {
      const shops = await fetchAllShops(userShopId, languageCode);

      const enriched = await Promise.all(
        shops.map(async (shop) => {
          const [ratingRes, commentRes, subscriberRes, subscriptionRes] = await Promise.allSettled([
            getShopAverageRating(shop.id),
            getShopCommentCount(shop.id),
            getShopSubscriberCount(shop.id),
            checkUserSubscription(shop.id, userId),
          ]);

          return {
            ...shop,
            rating: ratingRes.status === 'fulfilled' ? ratingRes.value : 0,
            reviews: commentRes.status === 'fulfilled' ? commentRes.value : 0,
            followers: subscriberRes.status === 'fulfilled' ? subscriberRes.value : 0,
            isSubscribed: subscriptionRes.status === 'fulfilled' ? subscriptionRes.value : false,
          };
        })
      );

      return enriched;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: 1000,
  });
};
