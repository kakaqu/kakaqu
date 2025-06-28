import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  phoneNumber: '',
  avatar: null,
  address: '',
  countryCode: '+93',
  languageId: null,       // Çoklu dil desteği için
  walletBalance: null,    // Jeton/Altın bakiyesi
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setLanguageId: (state, action) => {
      state.languageId = action.payload;
    },
    setWalletBalance: (state, action) => {
      state.walletBalance = action.payload;
    },
    resetUser: () => initialState, // kullanıcının tüm verilerini sıfırlar
  },
});

export const {
  setId,
  setName,
  setPhoneNumber,
  setAvatar,
  setAddress,
  setCountryCode,
  setLanguageId,
  setWalletBalance,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
