import supabase from '../../../../supabase';
import { loginSuccess, logout } from '../slices/authSlice';
import {
  setId,
  setPhoneNumber,
  setName,
  setAvatar,
  setAddress,
  setCountryCode
} from '../../user/slices/userSlice';
import { findUserByMobile } from '../../user/services/userService';
import { CommonActions } from '@react-navigation/native';


export const verifyUser = async (phone, dispatch, navigation) => {
  try {
    const user = await findUserByMobile(phone);
    // console.log("📦 [verifyUser] Gelen kullanıcı:", user);

    if (!user) {
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'AddUser', params: { phoneNumber: phone } }],
      });
      return;
    }

    // ✅ Kullanıcı bilgilerini userSlice'a yaz
    dispatch(setId(user.id));
    dispatch(setPhoneNumber(user.mobile));
    dispatch(setName(user.name || ''));
    dispatch(setAvatar(user.avatar || null));
    dispatch(setAddress(user.address || ''));
    dispatch(setCountryCode(user.countryCode || '+93'));

    dispatch(loginSuccess());
  } catch (error) {
    console.error('✅ Kullanıcı kontrol hatası:', error.message || error);
    throw new Error('error_checking_user');
  }
};
