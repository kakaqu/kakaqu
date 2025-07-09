// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "../features/user/slices/userSlice";
import transactionsReducer from "../features/user/slices/transactionsSlice";
import authReducer from "../features/auth/slices/authSlice";
import languageReducer from "../features/language/slices/languageSlice";
import alertReducer from "../features/core/alertSlice";
import storage from "../shared/utils/storage/storage";
import loadingReducer from "../shared/slices/loadingSlice";
import globalModalReducer from "../shared/slices/globalModalSlice";
import shopReducer from "../features/shops/slices/shopSlice";




const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  language: languageReducer,
  alert: alertReducer,
  loading: loadingReducer,
  globalModal: globalModalReducer,
  transactions: transactionsReducer,
  shop: shopReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);


// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from '../features/user/slices/userSlice';
// import authReducer from '../features/auth/slices/authSlice';
// import languageReducer from "../features/language/slices/languageSlice";
// import alertReducer from "../features/core/alertSlice";


// export const store = configureStore({
//     reducer: {
//       user: userReducer,
//       auth: authReducer,
//       language: languageReducer,
//       alert: alertReducer,
//     }
//   })
