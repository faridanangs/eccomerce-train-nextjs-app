import { configureStore } from "@reduxjs/toolkit";
import productsSliceAll from "./sliceComponent/productSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    products: productsSliceAll,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false
    }).concat(logger),
});
