import { insertUser } from '../services/insertUser';
import { initializeUserData } from './initializeUserData';
import uploadImageToSupabase from '../../../shared/utils/upload/uploadImageToSupabase';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';
import { setIsOnboarded, setUserAll } from '../../user/slices/userSlice';
import { loginSuccess } from '../../auth/slices/authSlice';
import { getDailyTransferTotal } from '../services/gets/getDailyTransferTotal';


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
    
    const dailyTotal = await getDailyTransferTotal(userId);


    // ✅ 3. user_data / adres / bakiye vb. bilgileri ekle
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
    dispatch(setUserAll({
      id: userId,
      phoneNumber: dto.phoneNumber,
      name: dto.name,
      avatar: uploadedUrl,
      address: dto.address,
      countryCode: '+93',
      languageId: dto.languageId,
      walletBalance: dto.tokenAmount,
      isOnboarded: false, // ✅ burada belirtiyoruz
      dailyTransferTotal: dailyTotal,
    }));

    // ✅ 5. Giriş durumu aktif et
    dispatch(loginSuccess());

    // ✅ 6. Başarılı mesajı göster ve yönlendir
    dispatchAlert(dispatch, {
      type: 'success',
      title: t('messages.success'),
      message: t('user_register.registration_successful'),
      submitText: t('form.ok'),
      onSubmit: () => {
        navigation.replace('Onboarding'); 
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'Onboarding' }],
        // });
      },
    });

  } catch (err) {
    console.error('❌ Kullanıcı kayıt hatası:', err);

    dispatchAlert(dispatch, {
      type: 'error',
      title: t('info.error'),
      message: t('messages.error'),
      submitText: t('form.ok'),
    });

    throw err;
  }
};
