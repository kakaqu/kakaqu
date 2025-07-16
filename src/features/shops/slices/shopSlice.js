import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  description: '',
  avatar: null,        // shop_logos.logo_url
  categoryId: null,    // shops.category_id
  provinceId: null,    // shop_addresses.province_id
  districtId: null,    // shop_addresses.district_id
  mobile: '',          // shops.mobile
  addressLine: '',     // shop_addresses.address_line (isteğe bağlı ama önerilir)
  latitude: null,      // shop_addresses.latitude
  longitude: null,     // shop_addresses.longitude
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShopAll: (state, action) => ({ ...state, ...action.payload }),
    setId: (state, action) => { state.id = action.payload; },
    setName: (state, action) => { state.name = action.payload; },
    setDescription: (state, action) => { state.description = action.payload; },
    setAvatar: (state, action) => { state.avatar = action.payload; },
    setCategoryId: (state, action) => { state.categoryId = action.payload; },
    setProvinceId: (state, action) => { state.provinceId = action.payload; },
    setDistrictId: (state, action) => { state.districtId = action.payload; },
    setMobile: (state, action) => { state.mobile = action.payload; },
    setAddressLine: (state, action) => { state.addressLine = action.payload; },
    setLatitude: (state, action) => { state.latitude = action.payload; },
    setLongitude: (state, action) => { state.longitude = action.payload; },
    resetShop: () => initialState,
  },
});

export const {
  setShopAll,
  setId,
  setName,
  setDescription,
  setAvatar,
  setCategoryId,
  setProvinceId,
  setDistrictId,
  setMobile,
  setAddressLine,
  setLatitude,
  setLongitude,
  resetShop,
} = shopSlice.actions;

export default shopSlice.reducer;
