import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from "../features/user/userSlice";
import accountReducer from "../features/account/accountSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pCategoryReducer from "../features/pcategory/pcategorySlice";
import colorReducer from "../features/color/colorSlice";
import reportReducer from "../features/salesreport/reportSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/order/orderSlice";

// import clientProductReducer from "../features/clientproduct/productSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  product: productReducer,
  order: orderReducer,
  brand: brandReducer,
  pCategory: pCategoryReducer,
  color: colorReducer,
  report: reportReducer,
  upload: uploadReducer,
  coupon: couponReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
