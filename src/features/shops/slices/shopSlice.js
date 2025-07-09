import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  description: '',
  avatar: null,
  categoryId: null,
  provinceId: null,
  districtId: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopAll: (state, action) => ({ ...state, ...action.payload }),
    setName: (state, action) => { state.name = action.payload; },
    setDescription: (state, action) => { state.description = action.payload; },
    setAvatar: (state, action) => { state.avatar = action.payload; },
    setCategoryId: (state, action) => { state.categoryId = action.payload; },
    setProvinceId: (state, action) => { state.provinceId = action.payload; },
    setDistrictId: (state, action) => { state.districtId = action.payload; },
    resetShop: () => initialState,
  },
});

export const {
  setShopAll,
  setName,
  setDescription,
  setAvatar,
  setCategoryId,
  setProvinceId,
  setDistrictId,
  resetShop,
} = shopSlice.actions;

export default shopSlice.reducer;
