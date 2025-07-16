import uploadImageToSupabase from '../../../shared/utils/upload/uploadImageToSupabase';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';
import { setShopAll } from '../slices/shopSlice';
import { insertShop } from '../services/insertShop';
import { initializeShopData } from '../services/initializeShopData';
import { insertNotification } from '../../notifications/services/insertNotification';

export const registerShop = async ({ dto, dispatch, navigation, t, userId }) => {
  const now = new Date().toISOString();

  try {
    // ✅ Avatar yükleniyor
    const uploadedUrl = dto.avatar
      ? await uploadImageToSupabase(dto.avatar, 'shop_logos')
      : null;

    // ✅ Shop ana verisi ekleniyor
    const shopId = await insertShop({
      name: dto.name,
      description: dto.description,
      categoryId: dto.categoryId,
      mobile: dto.mobile,
      userId,
      now,
    });

    // ✅ Adres ve logo verileri ekleniyor
    await initializeShopData({
      shopId,
      logoUrl: uploadedUrl,
      provinceId: dto.provinceId,
      districtId: dto.districtId,
      addressLine: dto.addressLine,
      latitude: dto.latitude,
      longitude: dto.longitude,
      now,
    });

    // ✅ Redux state güncelleme
    dispatch(setShopAll({
      id: shopId,
      name: dto.name,
      description: dto.description || '',
      avatar: uploadedUrl,
      categoryId: dto.categoryId,
      provinceId: dto.provinceId,
      districtId: dto.districtId,
      mobile: dto.mobile || '',
      addressLine: dto.addressLine || '',
      latitude: dto.latitude || null,
      longitude: dto.longitude || null,
    }));

    // ✅ Bildirim gönder
    await insertNotification({
      userId,
      notificationTypeId: '401d3b39-3e8d-4b2f-ae89-57cea2c016ed', // 🔔 shop_created
      payload: {
        name: dto.name,
      },
    });

    // ✅ Kullanıcıya bilgi ver ve yönlendir
    dispatchAlert(dispatch, {
      type: 'success',
      title: t('info.success'),
      message: t('user_register.registration_successful'),
      submitText: t('form.ok'),
      onSubmit: () => navigation.replace('ShopDashboard'),
    });

  } catch (err) {
    console.error('❌ Dükkan kayıt hatası:', err);

    dispatchAlert(dispatch, {
      type: 'error',
      title: t('info.error'),
      message: t('user_register.registration_failed'),
      submitText: t('form.ok'),
    });

    throw err;
  }
};
