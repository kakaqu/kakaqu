import { createSlice } from '@reduxjs/toolkit';

const globalModalSlice = createSlice({
  name: 'globalModal',
  initialState: {
    visible: false,
    content: null, // Örn: 'SEND_GOLD', 'LAST_TRANSACTIONS'
    props: {},      // Modal içeriğine özel dinamik veriler
  },
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.content = action.payload.content;
      state.props = action.payload.props || {};
    },
    hideModal: (state) => {
      state.visible = false;
      state.content = null;
      state.props = {};
    },
  },
});

export const { showModal, hideModal } = globalModalSlice.actions;
export default globalModalSlice.reducer;
