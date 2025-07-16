import { createSlice } from '@reduxjs/toolkit';
import { sendGold } from '../../gold/actions/sendGoldAction';

const initialState = {
  id: null,
  name: '',
  phoneNumber: '',
  avatar: null,
  address: '',
  countryCode: '+93',
  languageId: null,
  walletBalance: null,
  isOnboarded: false,
  dailyTransferTotal: 0, // ✅ eklendi
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAll: (state, action) => {
      return { ...state, ...action.payload };
    },

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
    setIsOnboarded: (state, action) => {
      state.isOnboarded = action.payload;
    },
    setDailyTransferTotal: (state, action) => {
      state.dailyTransferTotal = action.payload;
    },

    resetUser: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(sendGold.fulfilled, (state, action) => {
      const amount = action.payload?.amount || 0;
      state.walletBalance = (state.walletBalance || 0) - amount;
      state.dailyTransferTotal = (state.dailyTransferTotal || 0) + amount; // ✅ güncelleme
    });
  },
});

export const {
  setUserAll,
  setId,
  setName,
  setPhoneNumber,
  setAvatar,
  setAddress,
  setCountryCode,
  setLanguageId,
  setWalletBalance,
  setIsOnboarded,
  setDailyTransferTotal, // ✅ export edildi
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
