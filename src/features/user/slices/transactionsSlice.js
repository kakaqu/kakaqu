import { createSlice } from '@reduxjs/toolkit';
import { getLastTransactions } from '../services/gets/getLastTransactions';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLastTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLastTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getLastTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'İşlem geçmişi alınamadı';
      });
  },
});

export default transactionsSlice.reducer;
