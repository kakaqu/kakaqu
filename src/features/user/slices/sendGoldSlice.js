import { createSlice } from '@reduxjs/toolkit';
// import { sendGoldAction } from '../actions/sendGoldAction';
import { sendGoldAction } from '../actions/sendGoldAction'

const sendGoldSlice = createSlice({
  name: 'sendGold',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetSendGoldState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendGoldAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendGoldAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendGoldAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Altın gönderilemedi.';
      });
  },
});

export const { resetSendGoldState } = sendGoldSlice.actions;
export default sendGoldSlice.reducer;
