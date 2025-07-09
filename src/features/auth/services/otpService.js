import supabase from '../../../../supabase';
import { loginSuccess, logout } from '../slices/authSlice';
import { resetUser, setPhoneNumber, setUserAll } from '../../user/slices/userSlice';
import { findUserByMobile } from '../../user/services/userService';
import getLanguageCode from '../../../shared/services/getLanguageCode'; // default export ise bu şekilde
import i18n from '../../../shared/locales/i18n';
import { getDailyTransferTotal } from '../../user/services/gets/getDailyTransferTotal';


export const verifyUser = async (phone, dispatch, navigation) => {
  try {
    const user = await findUserByMobile(phone);


    if (!user) {

      dispatch(logout());      // authSlice
      dispatch(resetUser());   // userSlice
      dispatch(setPhoneNumber(phone))

      navigation.reset({
        index: 0,
        routes: [{ name: 'AddUser', params: { phoneNumber: phone } }],
      });
      return;
    }
  const dailyTotal = await getDailyTransferTotal(user.id);
  
    dispatch(setUserAll({
      id: user.id,
      phoneNumber: user.mobile,
      name: user.name || '',
      avatar: user.avatar || null,
      address: user.address || '',
      countryCode: user.countryCode || '+93',
      languageId: user.language_id,
      walletBalance: user.walletBalance || 0,
      isOnboarded: true,
      dailyTransferTotal: dailyTotal,
    }));

    dispatch(loginSuccess());

    const languageCode = getLanguageCode(user.language_id); 
    if (languageCode && i18n.language !== languageCode) {
      i18n.changeLanguage(languageCode);
    }

  } catch (error) {
    console.error('✅ Kullanıcı kontrol hatası:', error.message || error);
    throw new Error('error_checking_user');
  }
};
