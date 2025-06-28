import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  languages: [],         // Tüm aktif dillerin listesi
  selected: {
    id: null,
    code: 'fa',
    name: null,
    native_name: null,
    is_default: false,
    is_active: true,
  },
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    // Tüm dilleri yükle (Supabase'den gelen)
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },

    // Seçili dili ayarla (tam nesne)
    setSelectedLanguage: (state, action) => {
      state.selected = action.payload;
    },

    // Sadece dil kodunu değiştir
    setSelectedLanguageCode: (state, action) => {
      state.selected.code = action.payload;
    },
  },
});

export const {
  setLanguages,
  setSelectedLanguage,
  setSelectedLanguageCode,
} = languageSlice.actions;

export default languageSlice.reducer;