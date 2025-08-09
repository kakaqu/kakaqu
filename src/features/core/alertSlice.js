import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  mode: 'alert', // 'alert' | 'toast' — yeni eklendi
  type: 'info', // 'success' | 'error' | 'warning' | 'info'
  title: '',
  message: '',
  showCancel: false,
  submitText: 'Tamam',
  cancelText: 'İptal',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      const payload = action.payload || {};
      Object.assign(state, {
        visible: true,
        mode: payload.mode || 'alert', // varsayılan: alert
        ...payload,
      });
    },
    hideAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;