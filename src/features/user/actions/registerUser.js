import { insertUser } from '../services/insertUser';
import { initializeUserData } from './initializeUserData';

import uploadImageToSupabase from '../../../shared/utils/upload/uploadImageToSupabase';
import { dispatchAlert } from '../../../shared/utils/upload/alertUtils';

import {
  setId,
  setPhoneNumber,
  setName,
  setAvatar,
  setAddress,
  setCountryCode,
  setLanguageId,
} from '../../user/slices/userSlice';

import { loginSuccess } from '../../auth/slices/authSlice'; // sadece isAuth + token

export const registerUser = async ({ dto, dispatch, navigation, t }) => {
  const now = new Date().toISOString();

  try {
    // 📤 1. Avatar yükle (varsa)
    const uploadedUrl = dto.avatar
      ? await uploadImageToSupabase(dto.avatar, 'user_photos')
      : null;

    // ✅ 2. Ana kullanıcıyı 'users' tablosuna ekle
    const userId = await insertUser({
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      languageId: dto.languageId,
      now,
    });

    // ✅ 3. user_data / adres / ilçe vb. bilgileri ekle
    await initializeUserData({
      userId,
      uploadedUrl,
      provinceId: dto.provinceId,
      districtId: dto.districtId,
      address: dto.address,
      tokenAmount: dto.tokenAmount,
      now,
    });

    // ✅ 4. Redux'a kullanıcı bilgilerini kaydet
    dispatch(setId(userId));
    dispatch(setName(dto.name || ''));
    dispatch(setPhoneNumber(dto.phoneNumber));
    dispatch(setAvatar(uploadedUrl));
    dispatch(setAddress(dto.address || ''));
    dispatch(setCountryCode('+93')); // normalizePhone zaten bu formatta
    dispatch(setLanguageId(dto.languageId));

    // ✅ 5. Giriş durumu aktif et (token yoksa parametre gönderilmez)
    dispatch(loginSuccess());

    // ✅ 6. Başarılı mesajı göster ve yönlendir
    dispatchAlert(dispatch, {
      type: 'success',
      title: 'Success',
      message: 'User created',
      submitText: 'Tamam',
      onSubmit: () => {
        navigation.navigate('Onboarding');
      },
    });


  } catch (err) {
    console.error('❌ Kullanıcı kayıt hatası:', err);

    dispatchAlert(dispatch, {
      type: 'error',
      title: t('info.error'),
      message: t('messages.error'),
      submitText: 'Tamam',
    });

    throw err;
  }
};
