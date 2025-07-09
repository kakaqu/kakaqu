import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gold: 0,
};

const userBalanceSlice = createSlice({
  name: 'userBalance',
  initialState,
  reducers: {
    setGold: (state, action) => {
      state.gold = action.payload;
    },
  },
});

export const { setGold } = userBalanceSlice.actions;
export default userBalanceSlice.reducer;
