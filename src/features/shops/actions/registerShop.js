import { insertShop } from '../services/insertShop';
import { initializeShopData } from '../services/initializeShopData';
import uploadImageToSupabase from '../../../shared/utils/upload/uploadImageToSupabase';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';
import { setShopAll } from '../slices/shopSlice';

export const registerShop = async ({ dto, dispatch, navigation, t, userId }) => {
  const now = new Date().toISOString();

  try {
    const uploadedUrl = dto.avatar
      ? await uploadImageToSupabase(dto.avatar, 'shop_logos')
      : null;

    const shopId = await insertShop({
      name: dto.name,
      description: dto.description,
      categoryId: dto.categoryId,
      userId,
      now,
    });

    await initializeShopData({
      shopId,
      logoUrl: uploadedUrl,
      provinceId: dto.provinceId,
      districtId: dto.districtId,
      now,
    });

    dispatch(setShopAll({
      id: shopId,
      name: dto.name,
      description: dto.description,
      avatar: uploadedUrl,
      categoryId: dto.categoryId,
      provinceId: dto.provinceId,
      districtId: dto.districtId,
    }));

    dispatchAlert(dispatch, {
      type: 'success',
      title: t('messages.success'),
      message: t('shop_register.registration_successful'),
      submitText: t('form.ok'),
      onSubmit: () => navigation.replace('ShopDashboard'),
    });

  } catch (err) {
    console.error('❌ Dükkan kayıt hatası:', err);

    dispatchAlert(dispatch, {
      type: 'error',
      title: t('info.error'),
      message: t('messages.error'),
      submitText: t('form.ok'),
    });

    throw err;
  }
};
