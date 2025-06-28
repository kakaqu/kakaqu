import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/slices/userSlice';
import authReducer from '../features/auth/slices/authSlice';
import languageReducer from "../features/language/slices/languageSlice";
import alertReducer from "../features/core/alertSlice";
import userBalanceSlice from "../features/user/slices/userBalanceSlice";



export const store = configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer,
      language: languageReducer,
      alert: alertReducer,
      userBalance: userBalanceSlice,
    }
  })