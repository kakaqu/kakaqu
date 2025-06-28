import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: null,      // kullanıcının tüm bilgileri burada
  token: null      // (varsa) token saklanabilir
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
      state.user = action.payload; // kullanıcı objesi
      state.token = action.payload?.token || null; // opsiyonel token
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
