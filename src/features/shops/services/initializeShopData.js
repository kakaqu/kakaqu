import { insertShopLogo } from './insertShopLogo';
import { insertShopAddress } from './insertShopAddress';

export const initializeShopData = async ({
  shopId,
  logoUrl,
  provinceId,
  districtId,
  addressLine,
  latitude,
  longitude,
  now,
}) => {
  await Promise.all([
    logoUrl ? insertShopLogo({ shopId, logoUrl, now }) : Promise.resolve(),
    insertShopAddress({
      shopId,
      provinceId,
      districtId,
      addressLine,
      latitude,
      longitude,
      now,
    }),
  ]);
};
