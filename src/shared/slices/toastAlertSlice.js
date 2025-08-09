import { createSlice } from '@reduxjs/toolkit';

const toastAlertSlice = createSlice({
  name: 'toastAlert',
  initialState: {
    visible: false,
    type: 'info',
    title: '',
    message: '',
  },
  reducers: {
    showToastAlert: (state, action) => {
      const { type, title, message } = action.payload;
      state.visible = true;
      state.type = type || 'info';
      state.title = title || '';
      state.message = message || '';
    },
    hideToastAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showToastAlert, hideToastAlert } = toastAlertSlice.actions;
export default toastAlertSlice.reducer;
